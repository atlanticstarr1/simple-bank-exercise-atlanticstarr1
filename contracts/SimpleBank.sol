pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
import "../contracts/Ilighthouse.sol"; // Rhombus oracle
import "../contracts/Lighthouse.sol";

/// @author David Noel
/// @title A bank contract that pays its users interest on a daily basis.
contract SimpleBank is Ownable, Pausable, Searcher {
    using SafeMath for uint256;

    // State variables

    // Bank interest rate
    uint public interestRate = 3;
    // Min balance required (USD) to start receiving interest payments.
    uint public minBalanceUsd = 1;
    // Eth equivalent of min balance (1eth ~ $320 USD 6/25/19)
    uint public minBalanceEth = 3200000000000000;
    // Total interest paid by bank to date
    uint private totalInterestPaid;
    // Are interest payments running?
    bool public running;
    // ETHUSD lighthouse oracle
    ILighthouse  public myLighthouse;
    // Array of users registered
    address[] private accounts;
    /* Protect our users balance from being viewable from other contracts. */
    mapping (address => uint) private balances;
    /* Getter function to allow contracts to be able to see if a user is enrolled. */
    mapping (address => bool) public enrolled;

    // Events

    /* When a user signs up */
    event Enrolled(address indexed accountAddress);
    /* When a user makes a deposit */
    event Deposited(address indexed accountAddress, uint amount);
    /* When a user makes a withdrawal */
    event Withdrawn(address indexed accountAddress, uint withdrawAmount, uint newBalance);
    /* When a user closes their account */
    event ClosedAccount(address indexed accountAddress, uint balanceAtClose);
    event InterestPaymentStarted(uint _rate, uint _minBalanceRequired);
    event InterestPaymentStopped();
    event InterestPaid(uint _totalInterest);
    event DataNotValid();   // for invalid oracle data

    // Modifiers

    modifier isEnrolled(){
        require(enrolled[msg.sender], "You must first enroll");
        _;
    }

    modifier checkEnroll(){
        require(msg.sender != address(0),"Invalid address.");
        require(!enrolled[msg.sender], "Already enrolled.");
        _;
    }

    modifier checkWithdraw(uint withdrawAmount){
        require(withdrawAmount > 0, "Withrawal must be greater than 0");
        require(balances[msg.sender] >= withdrawAmount, "Insufficient balance");
        require(address(this).balance >= balances[msg.sender],"Bank doesn't have enough money.");
        _;
    }

    modifier onlyLighthouse {
        require (msg.sender == address(myLighthouse), "Unauthorised");
        _;
    }

    // Constructor

    constructor(ILighthouse _myLighthouse) public {
        myLighthouse = _myLighthouse;
        startPayments();
    }

    // Functions

    /// @notice Enroll a customer with the bank
    /// @return The users enrolled status
    function enroll() public checkEnroll whenNotPaused returns (bool _enrolled){
        enrolled[msg.sender] = true;
        accounts.push(msg.sender);
        _enrolled = enrolled[msg.sender];
        emit Enrolled(msg.sender);
    }

    /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    // Users should be enrolled before they can make deposits
    function deposit() external payable isEnrolled whenNotPaused returns (uint _balance) {
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        _balance = balances[msg.sender];
        emit Deposited(msg.sender, msg.value);
    }

    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return The balance remaining for the user
    // checks-effects-interaction pattern to prevent re-entrancy
    function withdraw(uint withdrawAmount) external isEnrolled checkWithdraw(withdrawAmount) returns (uint _balance) {
        balances[msg.sender] = balances[msg.sender].sub(withdrawAmount);
        msg.sender.transfer(withdrawAmount);
        _balance = balances[msg.sender];
        emit Withdrawn(msg.sender, withdrawAmount, _balance);
    }

    /// @notice Close bank account and return all user's balance to them.
    /// @return The enrolled status of the user.
    // checks-effects-interaction pattern to prevent re-entrancy
    function closeAccount() external isEnrolled returns (bool) {
        uint totalBalance = balances[msg.sender];
        balances[msg.sender] = 0;
        enrolled[msg.sender] = false;
        if(totalBalance > 0){
            msg.sender.transfer(totalBalance);
        }
        emit ClosedAccount(msg.sender, totalBalance);
        return !enrolled[msg.sender];
    }

    /// @notice Get account balance
    /// @return The balance of the user (wei)
    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    /// @notice Get all registered accounts
    /// @return Array of accounts
    function getAccounts() public view onlyOwner returns (address[] memory) {
        return accounts;
    }

    /// @notice Get total accounts
    /// @return Account total
    function getNumAccounts() public view onlyOwner returns (uint) {
        return accounts.length;
    }

    /// @notice Get address of this contract
    /// @return The contract address
    function getContractAddress() public view returns (address) {
        return address(this);
    }

    /// @notice Get contract balance
    /// @return The balance of the contract
    function getContractBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function setInterestRate(uint _rate) public onlyOwner {
        require(_rate <= 6, "rate should be no more than 6");
        interestRate = _rate;
    }

    // set minimum deposit in USD
    function setMinBalance(uint _minBalance) public onlyOwner {
        require(_minBalance > 0, "balance should be greater than 0");
        minBalanceUsd = _minBalance;
    }

    function startPayments() public onlyOwner whenNotPaused {
        if(!running){
        running = true;
        emit InterestPaymentStarted(interestRate, minBalanceUsd);
        }
    }

    function stopPayments() public onlyOwner whenNotPaused {
        if(running){
        running = false;
        emit InterestPaymentStopped();
        }
    }

    // Gets called everytime lighthouse data changes.
    function poke() public onlyLighthouse whenNotPaused {
        bool valid;
        uint tenCents;
        if (running) {
            (tenCents, valid) = myLighthouse.peekData(); // get value in ETH of ten cents from Oracle
            if (!valid) {
                emit DataNotValid();
                return;
            }
            minBalanceEth = tenCents * 10 * minBalanceUsd; // calculate 1 USD in Ether
            payInterest();
        }
    }

    function payInterest() private {
        // WARN: This unbounded for loop is an anti-pattern
        for (uint i = 0; i < accounts.length; i++) {
            address customerAddress = accounts[i];
            uint balance = balances[customerAddress]; // get customer balance in eth
            if(balance != 0 && balance >= minBalanceEth){ // customer is eligible to get interest payments
                uint interest = (balance * interestRate).div(36500);
                balances[customerAddress] = balances[customerAddress].add(interest);
                totalInterestPaid += interest;
            }
        }
        emit InterestPaid(totalInterestPaid);
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    function() external payable {
        require(msg.data.length == 0, "data sent with message");
        emit Deposited(msg.sender, msg.value);
    }
}
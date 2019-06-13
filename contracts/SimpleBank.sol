pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
import "../contracts/Ilighthouse.sol"; // Rhombus oracle

/// @author David Noel
/// @title A bank contract that pays its users interest on a daily basis.
contract SimpleBank is Ownable, Pausable, Searcher {
    using SafeMath for uint256;

    //
    // State variables
    //

    // Banks interest rate
    uint public interestRate = 3;
    // Min balance required (USD) to start receiving interest payments.
    uint public minBalanceToGetInterestUSD = 1;
    uint public minBalanceToGetInterestEth;
    bool public running;
    // ETHUSD lighthouse oracle
    ILighthouse  public myLighthouse;
    // Array of users registered
    address[] private accounts;

    /* Protect our users balance from being viewable from other contracts. */
    mapping (address => uint) private balances;

    /* Getter function to allow contracts to be able to see if a user is enrolled. */
    mapping (address => bool) public enrolled;

    //
    // Events - publicize actions to external listeners
    //

    /* When a user signs up */
    event Enrolled(address indexed accountAddress);

    /* When a user makes a deposit */
    event Deposited(address indexed accountAddress, uint amount, uint newBalance);

    /* When a user makes a withdrawal */
    event Withdrawn(address indexed accountAddress, uint withdrawAmount, uint newBalance);

    /* When a user closes their account */
    event Closed(address indexed accountAddress, uint balanceAtClose);

    event PaymentReceived(address sender, uint amount); // fallback function
    event InterestPaymentStarted(uint _rate, uint _minBalanceRequired);
    event InterestPaymentStopped();
    event DataNotValid();   // for invalid oracle data

    //
    // Modifiers
    //

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
        require(getContractBalance() >= balances[msg.sender],"Contract doesn't have enough money.");
        _;
    }

    modifier onlyLighthouse {
        require (msg.sender == address(myLighthouse), "Unauthorised");
        _;
    }

    constructor(ILighthouse _myLighthouse) public {
        myLighthouse = _myLighthouse;
        startPayments();
    }

    //
    // Functions
    //

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
        emit Deposited(msg.sender, msg.value, _balance);
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
        emit Closed(msg.sender, totalBalance);
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

    /// @notice Get contract balance
    /// @return The balance of the contract
    function getContractBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function setInterestRate(uint _rate) public onlyOwner returns(uint){
        interestRate = _rate;
    }

    function startPayments() public onlyOwner {
        if(!running){
        running = true;
        emit InterestPaymentStarted(interestRate, minBalanceToGetInterestUSD);
        }
    }

    function stopPayments() public onlyOwner {
        if(running){
        running = false;
        emit InterestPaymentStopped();
        }
    }

    // Gets called everytime lighthouse data changes.
    function poke() public onlyLighthouse {
        bool valid;
        uint tenCents;
        if (running) {
            (tenCents, valid) = myLighthouse.peekData(); // get value in ETH of ten cents from Oracle
            if (!valid) {
                emit DataNotValid();
                return;
            }
            minBalanceToGetInterestEth = tenCents * 10 * minBalanceToGetInterestUSD; // calculate 1 USD in Ether
            payInterest();
        }
    }

    function payInterest() private {
        // WARN: This unbounded for loop is an anti-pattern
        for (uint i = 0; i < accounts.length; i++) {
            address customerAddress = accounts[i];
            uint balance = balances[customerAddress]; // get customer balance in eth
            if(balance != 0 && balance >= minBalanceToGetInterestEth){ // customer is eligible to get interest payments
                uint interest = (balance * interestRate).div(36500);
                balances[customerAddress] = balances[customerAddress].add(interest);
            }
        }
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function() external payable {
        require(msg.data.length == 0, "data sent with message");
        emit PaymentReceived(msg.sender, msg.value);
    }
}
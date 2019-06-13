pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
import "../contracts/Ilighthouse.sol"; // Rhombus oracle

/// @author David Noel
/// @title A bank contract that pays its users interest on a daily basis.
contract SimpleBank is Ownable, Pausable {
    using SafeMath for uint256;

    //
    // State variables
    //
    // Interest rate Oracle
    ILighthouse  public myLighthouse;
    // Array of users registered
    address[] private accounts;
    // Holds number of registered users
    uint private numAccounts = 0;

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
        _;
    }

    constructor(ILighthouse _myLighthouse) public {
        myLighthouse = _myLighthouse;
    }

    //
    // Functions
    //

    function getInterestRate() public view returns(uint){
        uint interestRate;
        bool ok;
        (interestRate,ok) = myLighthouse.peekData(); // obtain random number from Rhombus Lighthouse
        return interestRate;
    }

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
    /// @return balance of user
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

    /// @notice Get all registered accounts
    /// @return Array of accounts
    function getAccounts() public view onlyOwner returns (address[] memory) {
        return accounts;
    }

    /// @notice Get number of registered accounts.
    /// @return Number of accounts.
    function getNumberOfAccounts() public view onlyOwner returns (uint) {
        return accounts.length;
    }

    /// @notice Get balance
    /// @return The balance of the user
    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    /// @notice Get balance of contract
    /// @return The balance of the contract
    function getContractBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function() external payable {
        // require(msg.data.length == 0,"no data sent with message");
        // emit Deposited
        revert();
    }
}

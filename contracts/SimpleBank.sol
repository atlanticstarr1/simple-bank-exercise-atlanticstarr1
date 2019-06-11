pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';

/// @author David Noel
/// @title A bank contract that pays its users interest on a daily basis.
contract SimpleBank is Ownable, Pausable {
    using SafeMath for uint256;

    //
    // State variables
    //

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
    event Deposited(address indexed accountAddress, uint amount);

    /* When a user makes a withdrawal */
    event Withdrawn(address indexed accountAddress, uint withdrawAmount, uint newBalance);

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

    //
    // Functions
    //

    /// @notice Enroll a customer with the bank
    /// @return The users enrolled status
    function enroll() public checkEnroll() whenNotPaused() returns (bool _enrolled){
        enrolled[msg.sender] = true;
        _enrolled = enrolled[msg.sender];
        emit Enrolled(msg.sender);
    }

    /// @notice Get balance
    /// @return The balance of the user
    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    /// @notice Get balance of contract
    /// @return The balance of the contract
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    // Users should be enrolled before they can make deposits
    function deposit() external payable isEnrolled() whenNotPaused() returns (uint _balance) {
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        _balance = balances[msg.sender];
        emit Deposited(msg.sender, msg.value);
    }

    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return The balance remaining for the user
    function withdraw(uint withdrawAmount) public isEnrolled() checkWithdraw(withdrawAmount) returns (uint _balance) {
        balances[msg.sender] = balances[msg.sender].sub(withdrawAmount);
        msg.sender.transfer(withdrawAmount);
        _balance = balances[msg.sender];
        emit Withdrawn(msg.sender, withdrawAmount, _balance);
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function() external {
        revert("Reverting contract state.");
    }
}

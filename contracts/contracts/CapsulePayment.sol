// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CapsulePayment {
    struct Capsule {
        address creator;
        uint256 unlockDate;
        bool isUnlocked;
        uint256 paymentAmount;
    }

    mapping(uint256 => Capsule) public capsules;
    uint256 public capsuleCount;
    address public owner;

    event CapsuleCreated(uint256 indexed capsuleId, address indexed creator, uint256 unlockDate, uint256 paymentAmount);
    event CapsuleUnlocked(uint256 indexed capsuleId, address indexed unlocker, uint256 paymentAmount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    modifier canUnlock(uint256 capsuleId) {
        require(block.timestamp >= capsules[capsuleId].unlockDate, "Capsule is not yet unlockable");
        require(!capsules[capsuleId].isUnlocked, "Capsule has already been unlocked");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Create a new capsule with a specified unlock date and payment amount
    function createCapsule(uint256 _unlockDate, uint256 _paymentAmount) external returns (uint256) {
        require(_unlockDate > block.timestamp, "Unlock date must be in the future");

        capsules[capsuleCount] = Capsule({
            creator: msg.sender,
            unlockDate: _unlockDate,
            isUnlocked: false,
            paymentAmount: _paymentAmount
        });

        emit CapsuleCreated(capsuleCount, msg.sender, _unlockDate, _paymentAmount);
        return capsuleCount++;
    }

    // Unlock a capsule and trigger payment to the creator
    function unlockCapsule(uint256 capsuleId) external payable canUnlock(capsuleId) {
        Capsule storage capsule = capsules[capsuleId];
        require(msg.value == capsule.paymentAmount, "Incorrect payment amount");

        // Mark the capsule as unlocked
        capsule.isUnlocked = true;

        // Transfer the payment to the capsule creator
        payable(capsule.creator).transfer(msg.value);

        emit CapsuleUnlocked(capsuleId, msg.sender, msg.value);
    }

    // Retrieve details of a capsule
    function getCapsule(uint256 capsuleId) external view returns (address, uint256, bool, uint256) {
        Capsule memory capsule = capsules[capsuleId];
        return (capsule.creator, capsule.unlockDate, capsule.isUnlocked, capsule.paymentAmount);
    }

    // Withdraw contract funds (if any)
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to handle accidental ETH transfers
    receive() external payable {}
}

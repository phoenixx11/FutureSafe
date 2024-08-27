// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WhitelistSchemaHook {
    struct TimeCapsule {
        address creator;
        uint256 unlockDate;
        address recipient;
    }

    mapping(bytes32 => TimeCapsule) public timeCapsules;
    mapping(address => mapping(bytes32 => bool)) public whitelisted;
    address public owner;

    event TimeCapsuleCreated(bytes32 capsuleId, address creator, uint256 unlockDate, address recipient);
    event AttestationCreated(bytes32 capsuleId, address attester);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyWhitelisted(bytes32 _capsuleId) {
        require(whitelisted[msg.sender][_capsuleId], "Not whitelisted");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createTimeCapsule(
        bytes32 _capsuleId,
        uint256 _unlockDate,
        address _recipient
    ) external {
        require(_unlockDate > block.timestamp, "Unlock date must be in the future");
        timeCapsules[_capsuleId] = TimeCapsule(msg.sender, _unlockDate, _recipient);
        whitelisted[_recipient][_capsuleId] = true;

        emit TimeCapsuleCreated(_capsuleId, msg.sender, _unlockDate, _recipient);
    }

    function beforeAttestation(bytes32 _capsuleId) external onlyWhitelisted(_capsuleId) {
        TimeCapsule memory capsule = timeCapsules[_capsuleId];
        require(block.timestamp >= capsule.unlockDate, "Cannot attest before unlock date");
        emit AttestationCreated(_capsuleId, msg.sender);
    }

    function afterRevocation(bytes32 _capsuleId) external onlyOwner {
        delete timeCapsules[_capsuleId];
    }
}

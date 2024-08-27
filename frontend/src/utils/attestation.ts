import { SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import { EvmChains } from 'viem';
import { timeCapsuleSchema } from '../schemas/timeCapsuleSchema'; // Replace with your schema
import { privateKeyToAccount } from 'viem';
// Initialize the Sign Protocol client (replace with your credentials)
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains, // Choose a valid chain
  account: privateKeyToAccount(process.env.PRIVATE_KEY), // Use your private key from environment variables
});

// Function to create a time capsule attestation
export const createTimeCapsuleAttestation = async (capsuleData: {
  data: string;
  unlockDate: Date;
  authorizedUsers: string[];
}) => {
  // Prepare attestation data (without payment field)
  const attestationData = {
    data: capsuleData.data,
    unlockDate: capsuleData.unlockDate.toISOString(),
    authorizedUsers: capsuleData.authorizedUsers,
  };

  
  try {
    console.log('Attestation created with ID:', attestation.id);
    return attestation.id; // Return the attestation ID for future reference
  } catch (error) {
    console.error('Error creating attestation:', error.message);
    throw error; // Re-throw for further handling if needed
  }
};

// Function to unlock the time capsule attestation (example usage)
export const unlockTimeCapsuleAttestation = async (attestationId: string, currentUser: string) => {
  try {
    const attestation = await client.verifyAttestation(attestationId);

    if (new Date() < new Date(attestation.data.unlockDate)) {
      throw new Error('Time capsule is not yet unlocked');
    }

    if (!attestation.data.authorizedUsers.includes(currentUser)) {
      throw new Error('You are not authorized to unlock this capsule');
    }

    return attestation.data.data; // Return the stored data
  } catch (error) {
    // Handle errors appropriately, e.g., display error message to user
    console.error('Error unlocking time capsule:', error.message);
    throw error; // Re-throw for further handling if needed
  }
};

// Example usage (call both functions)
(async () => {
  try {
    const capsuleData = {
      data: 'This is the secret message!',
      unlockDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Unlock in 1 day
      authorizedUsers: ['0x...', '0x...'], // Replace with recipient addresses
    };

    const attestationId = await createTimeCapsuleAttestation(capsuleData);
    console.log('Created attestation. You can store attestationId for later use.');

    // ... (Later, when a recipient wants to unlock)

    const unlockedData = await unlockTimeCapsuleAttestation(attestationId, '0x...'); // Replace with recipient address
    console.log('Unlocked data:', unlockedData);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
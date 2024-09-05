import { SignProtocolClient, SpMode, EvmChains } from '@ethsign/sp-sdk';
import { ethers } from 'ethers';

// Check if window.ethereum is available
const isBrowser = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

let client: SignProtocolClient;

if (isBrowser) {
  // Use window.ethereum if running in a browser environment
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia, // You can adjust the chain as needed
    provider: provider, // Use the provider from window.ethereum
  });
} else {
  throw new Error('No Ethereum provider found. Make sure to run this in a browser with MetaMask or similar wallet.');
}

export const createTimeCapsuleSchema = async () => {
  try {
    // Create a schema with the required fields and a whitelist hook contract
    const response = await client.createSchema({
      name: 'Time Capsule with Whitelist Hook',
      description: 'Store data to be unlocked at a future date with whitelist control',
      data: [
        { name: 'data', type: 'string', description: 'Data to be stored' },
        { name: 'unlockDate', type: 'string', description: 'Date to unlock the capsule' }, // Use 'string' for dates
        { name: 'authorizedUsers', type: 'address[]', description: 'Users authorized to unlock the capsule' },
      ],
      hookAddress: '', // Whitelist hook address
    });

    // Log and return the schema ID
    console.log('Schema created with Hook:', response);
    const schemaId = response.schemaId;
    console.log('Schema ID:', schemaId);
    return schemaId;
  } catch (error) {
    console.error('Failed to create schema with hook:', error);
  }
};

// Execute if running in the browser
if (isBrowser) {
  createTimeCapsuleSchema().catch(console.error);
}
import { SignProtocolClient, SpMode, EvmChains } from '@ethsign/sp-sdk'; // Import the Sign Protocol SDK and EvmChains
import { getMaxListeners } from 'events';
import { privateKeyToAccount } from 'viem/accounts'; // Import utility to convert private key to account

// Define the correct Attestation type based on your schema
type Attestation = {
  schemaId: string;
  data: {
    data: string;                  // Correct data type
    unlockDate: number;            // Date should be a string
    authorizedUsers: string[];     // Address array as string array
    holographicMessage: string;
    memoryEnhancements: string;
    visualTheme: string;
    indexingValue: string; 

  },
};
const schema: Schema = {
  name: "CreateCapsule",
  data: [
    { name: "data", type: "string"},
    { name: "unlockDate", type: "number"}, 
    { name: "authorizedUsers", type: "string[]"},
    { name: "holographicMessage", type: "string"},
    { name: "memoryEnhancements", type: "string"}, 
    { name: "visualTheme", type: "string"},
    { name: "indexingValue", type: "string"},
  ],
};

// Initialize the Sign Protocol Client in on-chain mode
const privateKey = '0xbd11757a1dda972b7c67f1b1573a0a403f7b1ca8f119ffbf1d96aa7885b4910f'; // Load private key
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.sepolia, // Specify the chain you are using
  account: privateKeyToAccount(privateKey), // Convert private key to account
});

// Function to generate attestation on-chain
export const createAttestation = async (schemaId: string, data: { data: string; unlockDate: number; authorizedUsers: string; holographicMessage: string; memoryEnhancements: string; visualTheme: string; }) => {
  try {
    // Define the attestation data structure based on your schema and data
    const attestation: Attestation = {
      schemaId,
      data: {
        data: "string",
        unlockDate: 1234567890, // Example timestamp
        authorizedUsers: ["address1", "address2"] , // Array of addresses
        holographicMessage: "Hello, world!",
        memoryEnhancements: "Enhanced memory",
        visualTheme: "Dark theme",
        indexingValue: "10000000000", // Set a unique indexing value
      },
    };

    // Call the createAttestation function to create the attestation on-chain
    const attestationResult = await client.createAttestation(attestation, {
      getTxHash: (txHash) => {
        console.log('Attestation transaction hash:', txHash); // Log the transaction hash
      },
    });

    // Check if attestationResult has the property attestationId
    if (!attestationResult || !attestationResult.attestationId) {
      throw new Error('Attestation creation result is not valid.');
    }

    console.log('Generated Attestation ID:', attestationResult.attestationId); // Log the attestation ID
    return attestationResult.attestationId;
  } catch (error) {
    console.error('Failed to create attestation on-chain:', error);
    throw new Error('Attestation creation failed');
  }
};

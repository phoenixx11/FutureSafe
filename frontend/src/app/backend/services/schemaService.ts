import { SignProtocolClient, SpMode, EvmChains, Schema, SchemaItem } from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';

const privateKey = '0xbd11757a1dda972b7c67f1b1573a0a403f7b1ca8f119ffbf1d96aa7885b4910f';
const rpcUrl = 'https://eth-sepolia.g.alchemy.com/v2/kksljUTHDVAvILBoeYSu0qM2ybE2EFXD';

if (!privateKey) {
  throw new Error("Private key is undefined. Please provide a valid private key.");
}

// Initialize the Sign Protocol Client using EvmChains.Sepolia
export const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.sepolia, 
  account: privateKeyToAccount(privateKey),
});

// Define your schema with correct types
const schema: Schema = {
  name: "CreateCapsule",
  data: [
    { name: "data", type: "string"},
    { name: "unlockDate", type: "string"}, 
    { name: "authorizedUsers", type: "string[]"},
    { name: "holographicMessage", type: "string"},
    { name: "memoryEnhancements", type: "string"}, 
    { name: "visualTheme", type: "string"},
    { name: "indexingValue", type: "string"},
  ],
};

// Function to register a schema on-chain
export const registerSchemaOnChain = async (): Promise<string> => {
  try {
    // Log the schema before trying to register it
    console.log('Attempting to register schema:', schema);

    // Call the createSchema function to register the schema on-chain
    const schemaResult = await client.createSchema(schema, {
      getTxHash: (txHash) => {
        console.log('Schema transaction hash:', txHash); // Log the transaction hash
      },
    });

    // Log the schemaResult to verify its content
    console.log('Schema registration result:', schemaResult);

    // Check if schemaResult and schemaId are defined
    if (!schemaResult || !schemaResult.schemaId) {
      throw new Error('Schema registration did not return a valid schema ID.');
    }

    console.log('Registered Schema ID:', schemaResult.schemaId); // Log the schema ID
    return schemaResult.schemaId; // Return the schema ID
  } catch (error) {
    console.error('Failed to register schema on-chain:', error); // Log the error if registration fails
    throw new Error('Schema registration failed'); // Throw an error if registration fails
  }
};


import { SignProtocolClient, SpMode, EvmChains } from '@ethsign/sp-sdk'; // Import the Sign Protocol SDK and EvmChains
import { privateKeyToAccount } from 'viem/accounts'; // Import utility to convert private key to account
 
type Attestation = {
  schemaId: string;
  data: {
    contractDetails: string;  // Customize as per your actual data structure
    signer: string;           // Customize as per your actual data structure
  };
};

// Initialize the Sign Protocol Client in on-chain mode
const privateKey = '0xbd11757a1dda972b7c67f1b1573a0a403f7b1ca8f119ffbf1d96aa7885b4910f'; // Load private key from environment variables

if (!privateKey) {
  throw new Error("Private key is undefined. Please set the PRIVATE_KEY environment variable.");
}

export const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.sepolia, // Specify the target blockchain network (Sepolia in this case)
  account: privateKeyToAccount(privateKey),
});

// Function to generate attestation on-chain
async function createAttestation(schemaId: string, data: { contractDetails: string; signer: string }) {
  try {
    // Create the attestation object with the correct type
    const attestation: Attestation = {
      schemaId,
      data,
    };

    // Replace with actual implementation
    const result = await client.createAttestation(attestation);
    console.log('Attestation created successfully:', result);
    console.log('Attestation ID:', result.attestationId);
  } catch (error: any) {
    console.error('Error creating attestation:', error.message || error);
  }
}

 

  



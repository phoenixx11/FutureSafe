import { SignProtocolClient, SpMode, EvmChains } from '@ethsign/sp-sdk'; // Import the Sign Protocol SDK and EvmChains
import { privateKeyToAccount } from 'viem/accounts'; // Import utility to convert private key to account
 


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
export const generateAttestationOnChain = async (schemaId: string, data: any) => {
  try {
    // Define the attestation data structure based on your schema and data
    const attestation = {
      schemaId,
      data,
    };

    // Call the createAttestation function to create the attestation on-chain
    const attestationResult = await client.createAttestation(attestation, {
      getTxHash: (txHash) => {
        console.log('Attestation transaction hash:', txHash); // Log the transaction hash
      },
    });

    console.log('Generated Attestation ID:', attestationResult.attestationId); // Log the attestation ID
    return attestationResult.attestationId;
  } catch (error) {
    console.error('Failed to create attestation on-chain:', error);
    throw new Error('Attestation creation failed');
  }
};

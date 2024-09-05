import LitJsSdk from 'lit-js-sdk'; // Import Lit Protocol SDK
import { storeDataOnArweave } from '../arweaveService'; // Import Arweave storage function
import { generateAttestationOnChain } from '../../../services/signProtocol'; // Import attestation service

// Initialize Lit Protocol client
const client = new LitJsSdk.LitNodeClient();

export const encryptAndCreateAttestation = async (data: Uint8Array, schemaId: string, capsuleData: any): Promise<string> => {
  try {
    // Connect to Lit Protocol network
    await client.connect();

    // Define encryption conditions (you can customize this based on your needs)
    const accessControlConditions = [
      {
        conditionType: 'evmBasic',
        contractAddress: '', // specify the contract address if needed
        standardContractType: '',
        chain: 'sepolia', // specify the chain you are using
        method: '',
        parameters: [''],
        returnValueTest: {
          comparator: '=',
          value: '',
        },
      },
    ];

    // Encrypt data using Lit Protocol
    const encryptedData = await LitJsSdk.encryptString(data.toString(), accessControlConditions, client);

    // Store encrypted data on Arweave
    const arweaveTransactionId = await storeDataOnArweave(encryptedData);
    console.log('Stored encrypted data on Arweave with Transaction ID:', arweaveTransactionId);

    // Prepare data for attestation
    const attestationData = {
      ...capsuleData,
      arweaveTransactionId, // Include Arweave transaction ID in the attestation data
    };

    // Create attestation on-chain using the Sign Protocol
    const attestationId = await generateAttestationOnChain(schemaId, attestationData);
    console.log('Generated Attestation ID:', attestationId);

    return attestationId;
  } catch (error) {
    console.error('Error in encryption and attestation process:', error);
    throw new Error('Failed to encrypt data and create attestation');
  }
};

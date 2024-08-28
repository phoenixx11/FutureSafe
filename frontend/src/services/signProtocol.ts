import axios from 'axios';
import { encryptData } from './litActions'; 
// Define the API endpoint
const API_ENDPOINT = 'https://testnet-rpc.sign.global/api';

// Function to create a new attestation
export const createTimeCapsuleAttestation = async (capsuleData: any, publicKey: string) => {
  try {
    // Make a POST request to create an attestation
    const encryptedData = await encryptData(JSON.stringify(capsuleData), publicKey);
    const response = await axios.post(`${API_ENDPOINT}/attestations`, {
      schemaId: 'onchain_evm_11155111_0x7e', // Adjust schemaId as needed
      data: encryptedData,
    });

    // Extract and return the attestation ID from the response
    const attestationId = response.data.data.id;
    console.log('Generated Attestation ID:', attestationId);

    return attestationId;
  } catch (error) {
    console.error('Error creating attestation:', error);
    throw error;
  }
};

// Function to retrieve attestation data by ID
export const getAttestationById = async (attestationId: string) => {
  try {
    // Make a GET request to retrieve attestation details
    const response = await axios.get(`${API_ENDPOINT}/index/attestations/${attestationId}`);

    // Extract and return attestation data
    const attestationData = response.data.data;
    console.log('Attestation Data:', attestationData);

    return attestationData;
  } catch (error) {
    console.error('Error retrieving attestation data:', error);
    throw error;
  }
};

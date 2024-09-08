import { createAttestation } from '../../../services/signProtocol';

export const handleAttestation = async (schemaId: string, arweaveTransactionId: string) => {
  try {
    // Define the schema for the attestation
    const schema = {
      name: "CreateCapsule",
      data: [
        { name: "data", type: "string" },
        { name: "unlockDate", type: "string" },
        { name: "authorizedUsers", type: "string[]" },
        { name: "holographicMessage", type: "string", optional: true },
        { name: "memoryEnhancements", type: "string", optional: true },
        { name: "visualTheme", type: "string", optional: true },
      ],
    };

    // Define the data to be attested, ensuring it matches the schema
    const dataToAttest = {
      data: '', // Replace with your actual data
      unlockDate: '', // Replace with your unlock date
      authorizedUsers: [], // Replace with an array of authorized user email addresses
      holographicMessage: '', // Optional
      memoryEnhancements: '', // Optional
      visualTheme: '', // Optional
    };

    // Generate the attestation on-chain
    const attestationId = await createAttestation(schemaId, dataToAttest);
    console.log('Generated Attestation ID:', attestationId);

    return attestationId;
  } catch (error) {
    console.error('Failed to generate attestation:', error);
    throw new Error('Attestation generation failed');
  }
};

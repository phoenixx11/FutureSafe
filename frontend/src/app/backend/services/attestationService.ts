import { generateAttestationOnChain } from '../../../services/signProtocol';

export const handleAttestation = async (schemaId: string, arweaveTransactionId: string) => {
  try {
    // Define the data to be attested
    const dataToAttest = {
      arweaveTransactionId,
    };

    // Generate the attestation on-chain
    const attestationId = await generateAttestationOnChain(schemaId, dataToAttest);
    console.log('Generated Attestation ID:', attestationId);

    return attestationId;
  } catch (error) {
    console.error('Failed to generate attestation:', error);
    throw new Error('Attestation generation failed');
  }
};

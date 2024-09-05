import { registerSchemaOnChain } from './schemaService';
import { encryptData } from '../../services/litActions';
import { storeDataOnArweave } from '../../services/arweaveService';
import { handleAttestation } from './attestationService';
import { triggerPayment } from './paymentService';

export const createCapsule = async (data: string, privateKey: string, signProtocolAddress: string, amount: string) => {
  try {
    // Step 1: Register Schema
    const schemaId = await registerSchemaOnChain();

    // Step 2: Encrypt Data
    const { encryptedData } = await encryptData(data);

    // Step 3: Store Data on Arweave
    const arweaveTransactionId = await storeDataOnArweave(encryptedData);

    // Step 4: Generate Attestation
    const attestationId = await handleAttestation(schemaId, arweaveTransactionId);

    // Step 5: Trigger Payment
    const paymentTransactionHash = await triggerPayment(signProtocolAddress, amount, privateKey);

    console.log('Capsule creation successful:', { schemaId, attestationId, paymentTransactionHash });
  } catch (error) {
    console.error('Failed to create capsule:', error);
    throw new Error('Capsule creation failed');
  }
};

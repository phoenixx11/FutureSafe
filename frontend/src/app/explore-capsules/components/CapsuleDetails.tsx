import React, { useState } from 'react';
import styles from './styles.module.css'; 
import { decryptData, signAndBroadcastTransaction } from '../../../services/litActions';

interface CapsuleDetailsProps {
  capsule: {
    id: number;
    name: string;
    unlockDate: string;
    creator: string;
    blockchain: string;
    encryptedData: string; // Add encryptedData to the capsule props
  };
  onClose: () => void;
}

const CapsuleDetails: React.FC<CapsuleDetailsProps> = ({ capsule, onClose }) => {
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleUnlockAndPay = async () => {
    try {
      setStatus('Decrypting data...');
      const accessControlConditions = {};  // Define your Lit access control conditions here

      // Decrypt the data
      const decryptedData = await decryptData(capsule.encryptedData, accessControlConditions);
      setDecryptedContent(decryptedData);
      setStatus('Data decrypted successfully!');

      // Process payment after decryption
      setStatus('Processing payment...');
      const transactionData = {
        // Define transaction data based on your payment needs
        recipient: capsule.creator, // Payment goes to the creator
        amount: '10000000000000000', // Example amount in wei (0.01 ETH)
        blockchain: capsule.blockchain, // Blockchain to process the payment
      };

      const txHash = await signAndBroadcastTransaction(transactionData);
      setStatus(`Payment successful! Transaction Hash: ${txHash}`);
    } catch (error) {
      console.error('Error unlocking or processing payment:', error);
      setStatus('Failed to unlock or process payment.');
    }
  };

  return (
    <div className={styles.detailsOverlay}>
      <div className={styles.details}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>{capsule.name}</h2>
        <p><strong>Unlock Date:</strong> {capsule.unlockDate}</p>
        <p><strong>Creator:</strong> {capsule.creator}</p>
        <p><strong>Blockchain:</strong> {capsule.blockchain}</p>
        {decryptedContent ? (
          <>
            <h3>Decrypted Content:</h3>
            <p>{decryptedContent}</p>
          </>
        ) : (
          <button onClick={handleUnlockAndPay} className={styles.unlockButton}>
            Unlock Capsule
          </button>
        )}
        <p className={styles.status}>{status}</p>
      </div>
    </div>
  );
};

export default CapsuleDetails;


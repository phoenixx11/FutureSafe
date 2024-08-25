import React from 'react';
import styles from './styles.module.css'; 

interface CapsuleDetailsProps {
  capsule: {
    id: number;
    name: string;
    unlockDate: string;
    creator: string;
    blockchain: string;
  };
  onClose: () => void;
}

const CapsuleDetails: React.FC<CapsuleDetailsProps> = ({ capsule, onClose }) => {
  return (
    <div className={styles.detailsOverlay}>
      <div className={styles.details}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>{capsule.name}</h2>
        <p><strong>Unlock Date:</strong> {capsule.unlockDate}</p>
        <p><strong>Creator:</strong> {capsule.creator}</p>
        <p><strong>Blockchain:</strong> {capsule.blockchain}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default CapsuleDetails;

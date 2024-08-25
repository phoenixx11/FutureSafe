import React from 'react';
import styles from './styles.module.css'; // Ensure you have appropriate styles

interface CapsuleCardProps {
  capsule: {
    id: number;
    name: string;
    unlockDate: string;
    creator: string;
    blockchain: string;
  };
  onClick: () => void;
}

const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h2>{capsule.name}</h2>
      <p>Unlock Date: {capsule.unlockDate}</p>
      <p>Creator: {capsule.creator}</p>
      <p>Blockchain: {capsule.blockchain}</p>
    </div>
  );
};

export default CapsuleCard;

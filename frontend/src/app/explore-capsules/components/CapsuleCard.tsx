// create-capsule/components/CapsuleCard.tsx
"use client";
import React from 'react';
import styles from './styles.module.css';

interface Capsule {
  id: string;
  name: string;
  unlockDate: string;
  creator: string;
  blockchain: string;
  contents: string;
}

interface CapsuleCardProps {
  capsule: Capsule;
  onClick: (capsule: Capsule) => void;
}

export const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule, onClick }) => {
  return (
    <div
      className={styles.capsuleCard}
      onClick={() => onClick(capsule)}
      role="button"
      tabIndex={0}
    >
      <h3 className={styles.capsuleName}>{capsule.name}</h3>
      <p className={styles.capsuleDetails}>Unlock Date: {capsule.unlockDate}</p>
      <p className={styles.capsuleDetails}>Creator: {capsule.creator}</p>
      <p className={styles.capsuleDetails}>Blockchain: {capsule.blockchain}</p>
    </div>
  );
};

export default CapsuleCard;

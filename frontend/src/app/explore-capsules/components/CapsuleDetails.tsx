// create-capsule/components/CapsuleDetails.tsx
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
  ownership: string[];
}

interface CapsuleDetailsProps {
  capsule: Capsule;
  onClose: () => void;
}

export const CapsuleDetails: React.FC<CapsuleDetailsProps> = ({ capsule, onClose }) => {
  return (
    <div className={styles.detailsOverlay}>
      <div className={styles.detailsContent}>
        <h2 className={styles.detailsTitle}>{capsule.name}</h2>
        <p>Unlock Date: {capsule.unlockDate}</p>
        <p>Creator: {capsule.creator}</p>
        <p>Blockchain: {capsule.blockchain}</p>
        <p>Contents: {capsule.contents}</p>
        <p>Ownership & Governance: {capsule.ownership.join(', ')}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CapsuleDetails;




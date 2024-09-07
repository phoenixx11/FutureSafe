// create-capsule/components/CapsuleGallery.tsx
"use client";
import React from 'react';
import CapsuleCard from './CapsuleCard';
import styles from './styles.module.css';

interface Capsule {
  id: string;
  name: string;
  unlockDate: string;
  creator: string;
  blockchain: string;
  contents: string;
}

interface CapsuleGalleryProps {
  capsules: Capsule[];
  onCapsuleClick: (capsule: Capsule) => void;
}

const CapsuleGallery: React.FC<CapsuleGalleryProps> = ({ capsules, onCapsuleClick }) => {
  return (
    <div className={styles.galleryContainer}>
      {capsules.map((capsule) => (
        <CapsuleCard key={capsule.id} capsule={capsule} onClick={onCapsuleClick} />
      ))}
    </div>
  );
};

export default CapsuleGallery;

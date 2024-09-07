
// create-capsule/page.tsx
"use client";
import React, { useState } from 'react';
import styles from './components/styles.module.css';
import CapsuleGallery from './components/CapsuleGallery';
import CapsuleDetails from './components/CapsuleDetails';
import SearchBar from './components/SearchBar';

interface Capsule {
  id: string;
  name: string;
  unlockDate: string;
  creator: string;
  blockchain: string;
  contents: string;
  ownership: string[];
}

const dummyCapsules: Capsule[] = [
  { id: '1', name: 'Capsule Alpha', unlockDate: '2024-12-01', creator: 'Alice', blockchain: 'Ethereum', contents: 'Historical data', ownership: ['Alice'] },
  { id: '2', name: 'Capsule Beta', unlockDate: '2025-01-15', creator: 'Bob', blockchain: 'Solana', contents: 'Confidential docs', ownership: ['Bob'] },
  // More capsules...
];

const ExploreCapsulesPage: React.FC = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);

  const handleCapsuleClick = (capsule: Capsule) => {
    setSelectedCapsule(capsule);
  };

  const closeOverlay = () => {
    setSelectedCapsule(null);
  };

  const handleSearch = (filters: { query: string }) => {
    // Logic for filtering capsules based on search criteria
    alert(`Searching for: ${filters.query}`);
  };

  return (
    <div className={styles.explorePage}>
      <h1 className={styles.heading}>Explore Capsules</h1>
      <SearchBar onSearch={handleSearch} />
      <CapsuleGallery capsules={dummyCapsules} onCapsuleClick={handleCapsuleClick} />
      {selectedCapsule && <CapsuleDetails capsule={selectedCapsule} onClose={closeOverlay} />}
    </div>
  );
};

export default ExploreCapsulesPage;

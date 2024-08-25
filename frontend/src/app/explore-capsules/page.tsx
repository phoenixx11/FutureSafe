
'use client';

import React, { useState } from 'react';
import CapsuleCard from './components/CapsuleCard';
import CapsuleDetails from './components/CapsuleDetails';
import styles from './components/styles.module.css';

// Mock data for capsules
const mockCapsules = [
  { id: 1, name: 'Capsule 1', unlockDate: '2025-12-31', creator: 'User A', blockchain: 'Ethereum' },
  { id: 2, name: 'Capsule 2', unlockDate: '2026-06-30', creator: 'User B', blockchain: 'Polygon' },
  // Add more mock data as needed
];

const ExploreCapsules: React.FC = () => {
  const [selectedCapsule, setSelectedCapsule] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');

  // Filter and search logic
  const filteredCapsules = mockCapsules.filter(capsule =>
    (filter === 'All' || capsule.blockchain === filter) &&
    (capsule.name.toLowerCase().includes(search.toLowerCase()) || capsule.creator.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      <h1>Explore Time Capsules</h1>
      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Blockchains</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Polygon">Polygon</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={styles.gallery}>
        {filteredCapsules.map(capsule => (
          <CapsuleCard
            key={capsule.id}
            capsule={capsule}
            onClick={() => setSelectedCapsule(capsule)}
          />
        ))}
      </div>
      {selectedCapsule && (
        <CapsuleDetails capsule={selectedCapsule} onClose={() => setSelectedCapsule(null)} />
      )}
    </div>
  );
};

export default ExploreCapsules;


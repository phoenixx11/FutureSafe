// create-capsule/components/SearchBar.tsx
"use client";
import React, { useState } from 'react';
import styles from '../components/styles.module.css';
//import { queryAttestationList } from '../../backend/services/attestationService';
import { decryptDataWithLitAction } from '../../../services/litActions';

interface SearchBarProps {
  onSearch: (filters: { query: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [attestations, setAttestations] = useState([]); 
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const results = await queryAttestationList({ id: query, page: 1 });
      setAttestations(results);
      onSearch({ query });

      // Assuming we have a found attestation and want to decrypt its associated data
      if (results.length > 0) {
        const { ciphertext, dataToEncryptHash } = results[0]; // Example to fetch from first result

        // Replace with your actual access control conditions
        const accessControlConditions = [
          {
            contractAddress: '',
            standardContractType: '',
            chain: 'ethereum',
            method: 'eth_getBalance',
            parameters: [':userAddress', 'latest'],
            returnValueTest: {
              comparator: '>=',
              value: '0',
            },
          },
        ];

        const decryptedData = await decryptDataWithLitAction(
          accessControlConditions,
          ciphertext,
          dataToEncryptHash
        );

        console.log('Decrypted data:', decryptedData);
      }
    } catch (err) {
      setError('Failed to fetch attestations or decrypt data. Please try again.');
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by attestation ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {attestations.length > 0 && (
        <ul className={styles.resultsList}>
          {attestations.map((attestation, index) => (
            <li key={index}>{attestation.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;



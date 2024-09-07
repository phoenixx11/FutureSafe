// pages/voting.tsx
"use client";
import React, { useState } from 'react';
import styles from '../capsule-gov/components/styles.module.css';

const VotingPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = async () => {
    if (!selectedOption) {
      alert('Please select an option to vote.');
      return;
    }

    // Submit vote to the backend
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote: selectedOption }),
      });

      if (response.ok) {
        alert('Vote submitted successfully!');
      } else {
        alert('Failed to submit vote.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Voting Capsule</h1>
      <div className={styles.votingCard}>
        <h2 className={styles.subtitle}>Select Your Option</h2>
        <div className={styles.options}>
          <label className={styles.option}>
            <input
              type="radio"
              name="vote"
              value="Content Selection"
              onChange={() => setSelectedOption('Content Selection')}
            />
            Content Selection
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="vote"
              value="Unlock Conditions"
              onChange={() => setSelectedOption('Unlock Conditions')}
            />
            Unlock Conditions
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="vote"
              value="Feature Prioritization"
              onChange={() => setSelectedOption('Feature Prioritization')}
            />
            Feature Prioritization
          </label>
        </div>
        <button className={styles.voteButton} onClick={handleVote}>
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default VotingPage;

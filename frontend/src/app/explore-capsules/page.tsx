
'use client';
import React, { useState } from 'react';

const ExploreCapsulesPage = () => {
  const [attestationId, setAttestationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/decryptCapsule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attestationId, paymentStatus: 'completed' }),
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.encryptedData);
      } else {
        setData('Failed to unlock capsule.');
      }
    } catch (error) {
      console.error('Error unlocking capsule:', error);
      setData('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Explore Capsules</h1> 
      <input type="text" placeholder="Enter Attestation ID..." value={attestationId} onChange={(e) => setAttestationId(e.target.value)} /> 
      <button onClick={handleUnlock} disabled={loading}> {loading ? 'Unlocking...' : 'Unlock Capsule'} </button> <p>{data}</p> </div> ); };

export default ExploreCapsulesPage;

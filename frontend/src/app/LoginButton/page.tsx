// src/app/homepage/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './components/styles.module.css';

const Homepage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Handle login button click
  const handleLogin = () => {
    setLoading(true); // Set loading state
    window.location.href = '/api/auth/login'; // Redirect to backend login route
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Time Capsule</h1>
      <button onClick={handleLogin} className={styles.loginButton} disabled={loading}>
        {loading ? 'Logging in...' : 'Login with Sign Protocol'}
      </button>
    </div>
  );
};

export default Homepage;

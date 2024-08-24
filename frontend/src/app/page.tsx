import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <img src="/assets/time-capsule.jpg" alt="Time Capsule" className={styles.heroImage} />
          <h1 className={styles.heroTitle}>Preserve Your Legacy Across Time</h1>
          <p className={styles.heroSubtext}>
            Create, secure, and share your memories with the next generation using our advanced time capsule technology.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaButton}>Create a Time Capsule</button>
            <button className={styles.ctaButton}>Explore Capsules</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContent}>
          <h2 className={styles.featuresTitle}>Key Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h3>Quantum-Encrypted Storage</h3>
              <p>Secure your data with advanced quantum encryption.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Cross-Chain Governance</h3>
              <p>Manage your assets across multiple blockchains.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Omnichain Vaults</h3>
              <p>Store your assets in multi-chain vaults.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Holographic Messages</h3>
              <p>Send messages that come to life with holographic technology.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



import styles from './components/styles.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Your Dashboard</h1>

      {/* User Profile Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Profile Overview</h2>
        <div className={styles.profileOverview}>
          <div className={styles.profileItem}>
            <span>Linked Wallet:</span>
            <strong>0x1234...abcd</strong>
          </div>
          <div className={styles.profileItem}>
            <span>Past Interactions:</span>
            <strong>15 interactions</strong>
          </div>
          <div className={styles.profileItem}>
            <span>Created Capsules:</span>
            <strong>3 Capsules</strong>
          </div>
          <div className={styles.profileItem}>
            <span>Owned Capsules:</span>
            <strong>2 Capsules</strong>
          </div>
          <div className={styles.profileItem}>
            <span>Governance Participation:</span>
            <strong>4 Capsules</strong>
          </div>
        </div>
      </section>

      {/* Manage Capsules Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Manage Capsules</h2>
        <div className={styles.manageCapsules}>
          <ul className={styles.capsuleList}>
            <li className={styles.capsuleItem}>
              Time Capsule 1 - Unlocks: 2030
            </li>
            <li className={styles.capsuleItem}>
              Time Capsule 2 - Unlocks: 2040
            </li>
            <li className={styles.capsuleItem}>
              Time Capsule 3 - Unlocks: 2025
            </li>
          </ul>
        </div>
      </section>

      {/* Activity Feed Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Activity Feed</h2>
        <div className={styles.activityFeed}>
          <ul className={styles.timeline}>
            <li className={styles.timelineItem}>
              <p>Added new content to Time Capsule 1 - July 24, 2024</p>
            </li>
            <li className={styles.timelineItem}>
              <p>Transferred ownership of Time Capsule 2 - August 15, 2024</p>
            </li>
            <li className={styles.timelineItem}>
              <p>Time Capsule 3 is set to unlock in 6 months - February 25, 2024</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Governance Updates Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Governance Updates</h2>
        <div className={styles.governanceUpdates}>
          <ul>
            <li className={styles.governanceItem}>
              <p>Proposal for new security protocols on Time Capsule 1 - Voting ends: August 30, 2024</p>
            </li>
            <li className={styles.governanceItem}>
              <p>Vote to extend unlock date for Time Capsule 3 - Voting ends: September 10, 2024</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

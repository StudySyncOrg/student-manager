import React, { useState } from 'react';

export default function ProfilePage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleExport = () => {
    const data = {
      name: "Niyati !",
      email: "niyatisoni06@gmail.com",
      joinedDate: "10/10/2025",
      completedTasks: 0,
      pendingTasks: 0,
      focusSessions: 0,
      focusTime: "0m"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.layout}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Profile</h1>
          <p style={styles.subtitle}>Manage your account and view your progress</p>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>N</div>
            <div style={styles.userInfo}>
              <h2 style={styles.userName}>Niyati !</h2>
              <div style={styles.infoRow}>
                <svg style={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.5 5.5L8 1L13.5 5.5V13C13.5 13.2652 13.3946 13.5196 13.2071 13.7071C13.0196 13.8946 12.7652 14 12.5 14H3.5C3.23478 14 2.98043 13.8946 2.79289 13.7071C2.60536 13.5196 2.5 13.2652 2.5 13V5.5Z" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={styles.infoText}>niyatisoni06@gmail.com</span>
              </div>
              <div style={styles.infoRow}>
                <svg style={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2.5" y="3.5" width="11" height="10" rx="1" stroke="#64748b" strokeWidth="1.5"/>
                  <path d="M2.5 6.5H13.5M5.5 1.5V3.5M10.5 1.5V3.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={styles.infoText}>Joined 10/10/2025</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#dcfce7'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" stroke="#16a34a" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2" fill="#16a34a"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Completed Tasks</div>
              <div style={styles.statValue}>0</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#fed7aa'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ea580c" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" stroke="#ea580c" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2" fill="#ea580c"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Pending Tasks</div>
              <div style={styles.statValue}>0</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#ddd6fe'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9H4.5C3.67 9 3 9.67 3 10.5V17.5C3 18.33 3.67 19 4.5 19H6M6 9V19M6 9H8M6 19H8M18 9H19.5C20.33 9 21 9.67 21 10.5V17.5C21 18.33 20.33 19 19.5 19H18M18 9V19M18 9H16M18 19H16M16 5H8C6.89543 5 6 5.89543 6 7V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V7C18 5.89543 17.1046 5 16 5Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Focus Sessions</div>
              <div style={styles.statValue}>0</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#e9d5ff'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#9333ea" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#9333ea" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Focus Time</div>
              <div style={styles.statValue}>0m</div>
            </div>
          </div>
        </div>

        <div style={styles.settingsCard}>
          <h3 style={styles.settingsTitle}>Account Settings</h3>
          
          <div style={styles.settingItem}>
            <div>
              <div style={styles.settingLabel}>Email Notifications</div>
              <div style={styles.settingDescription}>Receive notifications about your tasks and sessions</div>
            </div>
            <label style={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                style={styles.toggleInput}
              />
              <span style={Object.assign({}, styles.toggleSlider, {backgroundColor: emailNotifications ? '#6366f1' : '#cbd5e1'})}></span>
            </label>
          </div>

          <div style={styles.settingItem}>
            <div>
              <div style={styles.settingLabel}>Dark Mode</div>
              <div style={styles.settingDescription}>Switch to dark theme</div>
            </div>
            <label style={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                style={styles.toggleInput}
              />
              <span style={Object.assign({}, styles.toggleSlider, {backgroundColor: darkMode ? '#6366f1' : '#cbd5e1'})}></span>
            </label>
          </div>

          <div style={styles.settingItem}>
            <div>
              <div style={styles.settingLabel}>Data Export</div>
              <div style={styles.settingDescription}>Download your data as JSON</div>
            </div>
            <button style={styles.exportButton} onClick={handleExport}>
              Export Data
            </button>
          </div>
        </div>

        <div style={styles.signOutCard}>
          <div>
            <h3 style={styles.signOutTitle}>Sign Out</h3>
            <p style={styles.signOutDescription}>Sign out of your account</p>
          </div>
          <button style={styles.signOutButton} onClick={() => alert('Sign out clicked')}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  },
  container: {
    flex: 1,
    maxWidth: '1000px',
    margin: '10px auto',
    padding: '30px 10px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: 0
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: '600',
    flexShrink: 0
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 16px 0'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  icon: {
    flexShrink: 0
  },
  infoText: {
    fontSize: '15px',
    color: '#64748b'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statInfo: {
    flex: 1
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#0f172a'
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  settingsTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 32px 0'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '24px',
    marginBottom: '24px',
    borderBottom: '1px solid #e2e8f0'
  },
  settingLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '4px'
  },
  settingDescription: {
    fontSize: '14px',
    color: '#64748b'
  },
  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '28px',
    cursor: 'pointer'
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0
  },
  toggleSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '28px',
    transition: 'background-color 0.3s',
    cursor: 'pointer'
  },
  exportButton: {
    backgroundColor: '#eef2ff',
    color: '#6366f1',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  signOutCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px 32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px'
  },
  signOutTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 4px 0'
  },
  signOutDescription: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0
  },
  signOutButton: {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};
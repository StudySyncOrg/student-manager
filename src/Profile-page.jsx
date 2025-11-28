import React, { useState, useEffect } from 'react';

export default function ProfilePage({ tasks = [], focusStats = {} }) {
  // Calculate stats from tasks and focus timer
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;

  // Default focus stats if not provided
  const {
    completedSessions = 0,
    focusMinutes = 0,
    streak = 0
  } = focusStats;

  const handleExport = () => {
    const data = {
      name: "Niyati !",
      email: "niyatisoni06@gmail.com",
      joinedDate: "10/10/2025",
      completedTasks: completedTasks,
      pendingTasks: pendingTasks,
      totalTasks: totalTasks,
      focusSessions: completedSessions,
      focusTime: `${focusMinutes}m`,
      currentStreak: streak,
      tasks: tasks // Include all tasks data
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get current date for joined date
  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
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
                <span style={styles.infoText}>Joined {getCurrentDate()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#dcfce7'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Completed Tasks</div>
              <div style={styles.statValue}>{completedTasks}</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#fed7aa'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Pending Tasks</div>
              <div style={styles.statValue}>{pendingTasks}</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#ddd6fe'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Total Tasks</div>
              <div style={styles.statValue}>{totalTasks}</div>
            </div>
          </div>
        </div>

        {/* Focus Timer Statistics */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#e9d5ff'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#9333ea" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="#9333ea" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Focus Sessions</div>
              <div style={styles.statValue}>{completedSessions}</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#c7d2fe'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Focus Time</div>
              <div style={styles.statValue}>{focusMinutes}m</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={Object.assign({}, styles.statIcon, {backgroundColor: '#fecaca'})}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 7L13 17M9 11L9 17M17 3L17 17M21 21L3 21" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={styles.statInfo}>
              <div style={styles.statLabel}>Current Streak</div>
              <div style={styles.statValue}>{streak}</div>
            </div>
          </div>
        </div>

        {/* Account Settings - Simplified */}
        <div style={styles.settingsCard}>
          <h3 style={styles.settingsTitle}>Account Settings</h3>
          
          <div style={styles.settingItem}>
            <div>
              <div style={styles.settingLabel}>Data Export</div>
              <div style={styles.settingDescription}>Download your tasks and focus data as JSON</div>
            </div>
            <button style={styles.exportButton} onClick={handleExport}>
              Export Data
            </button>
          </div>

          <div style={styles.settingItem}>
            <div>
              <div style={styles.settingLabel}>Account Information</div>
              <div style={styles.settingDescription}>View and manage your profile details</div>
            </div>
            <button style={styles.exportButton} onClick={() => alert('Edit profile clicked')}>
              Edit Profile
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
import React, { useState, useEffect } from 'react';

const AttendanceCalculator = () => {
  // Load subjects from localStorage on initial render
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem('attendanceSubjects');
    return savedSubjects ? JSON.parse(savedSubjects) : [];
  });

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('attendanceSubjects', JSON.stringify(subjects));
  }, [subjects]);

  const [currentView, setCurrentView] = useState('overview');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US'));

  const addSubject = () => {
    if (newSubjectName.trim()) {
      const newSubject = {
        id: Date.now(),
        name: newSubjectName,
        present: 0,
        total: 0,
        attendance: []
      };
      setSubjects([...subjects, newSubject]);
      setNewSubjectName('');
    }
  };

  const markAttendance = (subjectId, status) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        const newPresent = status === 'present' || status === 'late' ? subject.present + 1 : subject.present;
        const newAttendance = [...subject.attendance, {
          date: selectedDate,
          status: status
        }];
        return {
          ...subject,
          present: newPresent,
          total: subject.total + 1,
          attendance: newAttendance
        };
      }
      return subject;
    }));
  };

  // Add a function to delete a subject
  const deleteSubject = (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== subjectId));
    }
  };

  // Add a function to clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all attendance data? This cannot be undone.')) {
      setSubjects([]);
      localStorage.removeItem('attendanceSubjects');
    }
  };

  const calculateRequiredClasses = (present, total, target = 75) => {
    if (total === 0) return 0;
    const required = Math.ceil((target * total - 100 * present) / (100 - target));
    return Math.max(0, required);
  };

  const getAttendancePercentage = (present, total) => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };

  // Overview View
  const OverviewView = () => {
    if (subjects.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p>No subjects added yet</p>
          <p>Click "+ Add Subject" to get started</p>
        </div>
      );
    }

    return (
      <div>
        {subjects.map(subject => {
          const percentage = getAttendancePercentage(subject.present, subject.total);
          const requiredClasses = calculateRequiredClasses(subject.present, subject.total);
          
          return (
            <div key={subject.id} style={subjectCardStyle}>
              <div style={subjectHeaderStyle}>
                <h3 style={{ margin: '0 0 10px 0', flex: 1 }}>{subject.name}</h3>
                <button 
                  style={deleteButtonStyle}
                  onClick={() => deleteSubject(subject.id)}
                  title="Delete subject"
                >
                  ×
                </button>
              </div>
              <div style={percentageStyle}>{percentage}%</div>
              <div style={statsStyle}>
                <div>Present: {subject.present}</div>
                <div>Required: 75%</div>
                <div>Total: {subject.total}</div>
              </div>
              {requiredClasses > 0 ? (
                <div style={requiredStyle}>
                  ✔ Attend next {requiredClasses} classes to reach 75%
                </div>
              ) : (
                <div style={safeStyle}>
                  ✅ You have achieved 75% attendance!
                </div>
              )}
            </div>
          );
        })}
        
        {/* Clear All Data Button */}
        {subjects.length > 0 && (
          <div style={clearAllContainerStyle}>
            <button style={clearAllButtonStyle} onClick={clearAllData}>
              Clear All Data
            </button>
          </div>
        )}
      </div>
    );
  };

  // Mark Attendance View
  const MarkAttendanceView = () => {
    if (subjects.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p>No subjects added yet</p>
          <p>Add a subject first to mark attendance</p>
        </div>
      );
    }

    return (
      <div>
        <div style={dateSelectorStyle}>
          <label>Select Date: </label>
          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={inputStyle}
            placeholder="MM/DD/YYYY"
          />
        </div>
        
        {subjects.map(subject => (
          <div key={subject.id} style={subjectCardStyle}>
            <div style={subjectHeaderStyle}>
              <h3 style={{ margin: '0 0 10px 0', flex: 1 }}>{subject.name}</h3>
              <button 
                style={deleteButtonStyle}
                onClick={() => deleteSubject(subject.id)}
                title="Delete subject"
              >
                ×
              </button>
            </div>
            <div style={currentStatsStyle}>
              Current: {subject.present}/{subject.total} classes ({getAttendancePercentage(subject.present, subject.total)}%)
            </div>
            <div style={buttonGroupStyle}>
              <button 
                style={{...attendanceButton, backgroundColor: '#4CAF50'}}
                onClick={() => markAttendance(subject.id, 'present')}
              >
                Present
              </button>
              <button 
                style={{...attendanceButton, backgroundColor: '#FF9800'}}
                onClick={() => markAttendance(subject.id, 'late')}
              >
                Late
              </button>
              <button 
                style={{...attendanceButton, backgroundColor: '#f44336'}}
                onClick={() => markAttendance(subject.id, 'absent')}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Statistics View
  const StatisticsView = () => {
    if (subjects.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p>No subjects added yet</p>
          <p>Add subjects to see statistics</p>
        </div>
      );
    }

    const allAttendance = subjects.flatMap(subject => 
      subject.attendance.map(record => ({
        ...record,
        subjectName: subject.name
      }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div>
        <h3>Subject Performance</h3>
        {subjects.map(subject => (
          <div key={subject.id} style={performanceItemStyle}>
            <div>
              <strong>{subject.name}</strong>
              <span style={percentageBadgeStyle}>
                {getAttendancePercentage(subject.present, subject.total)}%
              </span>
            </div>
            <span>{subject.present}/{subject.total} classes</span>
          </div>
        ))}
        
        <h3 style={{ marginTop: '30px' }}>Recent Activity</h3>
        {allAttendance.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>No attendance records yet</p>
        ) : (
          <div style={tableStyle}>
            {allAttendance.slice(0, 10).map((record, index) => (
              <div key={index} style={tableRowStyle}>
                <span style={{...statusCellStyle, color: getStatusColor(record.status)}}>
                  {record.status}
                </span>
                <span style={subjectCellStyle}>{record.subjectName}</span>
                <span style={dateCellStyle}>{record.date}</span>
              </div>
            ))}
            {allAttendance.length > 10 && (
              <div style={moreRecordsStyle}>
                ... and {allAttendance.length - 10} more records
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#4CAF50';
      case 'late': return '#FF9800';
      case 'absent': return '#f44336';
      default: return '#666';
    }
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'mark':
        return <MarkAttendanceView />;
      case 'statistics':
        return <StatisticsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Attendance Calculator</h1>
        <p style={subtitleStyle}>Track your attendance and calculate required classes</p>
        {subjects.length > 0 && (
          <p style={dataStatusStyle}>
            📊 {subjects.length} subject{subjects.length !== 1 ? 's' : ''} saved
          </p>
        )}
      </header>

      <nav style={navStyle}>
        <button 
          style={navButtonStyle(currentView === 'overview')}
          onClick={() => setCurrentView('overview')}
        >
          Overview
        </button>
        <button 
          style={navButtonStyle(currentView === 'mark')}
          onClick={() => setCurrentView('mark')}
        >
          Mark Attendance
        </button>
        <button 
          style={navButtonStyle(currentView === 'statistics')}
          onClick={() => setCurrentView('statistics')}
        >
          Statistics
        </button>
      </nav>

      <hr style={dividerStyle} />

      <main style={mainStyle}>
        {renderCurrentView()}
      </main>

      <div style={addSubjectStyle}>
        <input
          type="text"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          placeholder="Subject name"
          style={subjectInputStyle}
          onKeyPress={(e) => e.key === 'Enter' && addSubject()}
        />
        <button style={addButtonStyle} onClick={addSubject}>
          + Add Subject
        </button>
      </div>
    </div>
  );
};

// New Styles
const subjectHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
};

const deleteButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  color: '#999',
  cursor: 'pointer',
  padding: '0',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const clearAllContainerStyle = {
  textAlign: 'center',
  marginTop: '20px'
};

const clearAllButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

const safeStyle = {
  backgroundColor: '#e8f5e8',
  padding: '8px',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#2e7d32'
};

const percentageBadgeStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  marginLeft: '8px'
};

const moreRecordsStyle = {
  textAlign: 'center',
  padding: '10px',
  color: '#666',
  fontSize: '14px',
  fontStyle: 'italic'
};

const dataStatusStyle = {
  fontSize: '14px',
  color: '#28a745',
  margin: '5px 0 0 0'
};

// Existing Styles (keep all the previous styles you had)
const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px'
};

const titleStyle = {
  margin: '0 0 10px 0',
  color: '#333'
};

const subtitleStyle = {
  margin: '0',
  color: '#666'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '20px'
};

const navButtonStyle = (isActive) => ({
  padding: '8px 16px',
  border: 'none',
  backgroundColor: isActive ? '#007bff' : '#f8f9fa',
  color: isActive ? 'white' : '#333',
  borderRadius: '4px',
  cursor: 'pointer'
});

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid #ddd',
  marginBottom: '20px'
};

const mainStyle = {
  minHeight: '300px',
  marginBottom: '30px'
};

const subjectCardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '15px',
  backgroundColor: '#f9f9f9'
};

const percentageStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#007bff',
  marginBottom: '10px'
};

const statsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  fontSize: '14px'
};

const requiredStyle = {
  backgroundColor: '#e8f5e8',
  padding: '8px',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#2e7d32'
};

const dateSelectorStyle = {
  marginBottom: '20px'
};

const inputStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginLeft: '10px'
};

const currentStatsStyle = {
  marginBottom: '15px',
  fontSize: '16px'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px'
};

const attendanceButton = {
  flex: 1,
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px'
};

const performanceItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #eee'
};

const tableStyle = {
  border: '1px solid #ddd',
  borderRadius: '4px',
  overflow: 'hidden'
};

const tableRowStyle = {
  display: 'flex',
  padding: '10px',
  borderBottom: '1px solid #eee',
  backgroundColor: 'white'
};

const statusCellStyle = {
  flex: '1',
  textTransform: 'capitalize',
  fontWeight: 'bold'
};

const subjectCellStyle = {
  flex: '2'
};

const dateCellStyle = {
  flex: '1',
  textAlign: 'right'
};

const addSubjectStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '20px'
};

const subjectInputStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const addButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default AttendanceCalculator;
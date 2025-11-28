import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header";
import "./App.css";
import Attendance from "./Attendance.jsx";
import ProfilePage from "./Profile-page.jsx";
import Timetable from "./Timetable.jsx";
import FocusTimer from "./FocusTimer.jsx";
import TaskPage from "./TaskPage.jsx";

function App() {
  const user = {
    name: "Niyati Soni",
    email: "niyatisoni06@gmail.com",
  };

  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Load focusStats from localStorage on initial render
  const [focusStats, setFocusStats] = useState(() => {
    const savedFocusStats = localStorage.getItem('focusStats');
    return savedFocusStats ? JSON.parse(savedFocusStats) : {
      completedSessions: 0,
      focusMinutes: 0,
      streak: 0
    };
  });

  // Save focusStats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('focusStats', JSON.stringify(focusStats));
  }, [focusStats]);

  // Function to update focus stats from FocusTimer
  const updateFocusStats = (newStats) => {
    setFocusStats(prev => ({
      ...prev,
      ...newStats
    }));
  };

  return (
    <Router>
      {/* ✅ Header fixed at the top */}
      <Header user={user} />

      {/* ✅ Sidebar fixed at left, content scrolls */}
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <ProfilePage 
                tasks={tasks}
                focusStats={focusStats}
              />
            } />
            <Route path="/Attendance" element={<Attendance />} />
            <Route path="/Profile-page" element={
              <ProfilePage 
                tasks={tasks}
                focusStats={focusStats}
              />
            } />
            <Route path="/Timetable" element={<Timetable />} />
            <Route path="/Focus" element={
              <FocusTimer 
                onStatsUpdate={updateFocusStats}
                currentStats={focusStats}
              />
            } />
            <Route path="/Tasks" element={
              <TaskPage 
                tasks={tasks}
                setTasks={setTasks}
              />
            } />
            {/* REMOVED THE DUPLICATE ROUTES BELOW */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
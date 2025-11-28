import React from "react";
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

  return (
    <Router>
      {/* ✅ Header fixed at the top */}
      <Header user={user} />

      {/* ✅ Sidebar fixed at left, content scrolls */}
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/Attendance" element={<Attendance />} />
            <Route path="/Profile-page" element={<ProfilePage />} />
            <Route path="/Timetable" element={<Timetable />} />
            <Route path="/Focus" element={<FocusTimer />} />
            <Route path="/Tasks" element={<TaskPage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

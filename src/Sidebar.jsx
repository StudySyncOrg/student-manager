import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

// Lucide React icons (lightweight alternative to MUI)
import { CheckSquare, CalendarDays, Timer, Presentation, Bot, User } from "lucide-react";

function Sidebar() {
  return (
    <div className="main-container">
      <ul className="list">
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CheckSquare size={20} /> Task
        </NavLink>

        <NavLink to="/timetable" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CalendarDays size={20} /> Timetable
        </NavLink>

        <NavLink to="/focus" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Timer size={20} /> Focus
        </NavLink>

        <NavLink to="/attendance" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Presentation size={20} /> Attendance
        </NavLink>

        <NavLink to="/assistance" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Bot size={20} /> Assistance
        </NavLink>

        <NavLink to="/Profile-page" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <User size={20} /> Profile
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;

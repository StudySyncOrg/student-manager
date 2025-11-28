import React from "react";
import "./header.css";
import { LogOut } from "lucide-react";

function Header({ user }) {
  if (!user) {
    return <header className="head-container">Loading...</header>;
  }

  return (
    <header className="head-container">
      <div className="title">Student Manager</div>

      <div className="user-profile">
        <div className="user-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>

        <span className="user-email">{user.email}</span>

        <button className="logout-btn">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;

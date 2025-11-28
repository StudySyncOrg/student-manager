import React, { useState, useEffect } from "react";
import { RotateCcw, Settings } from "lucide-react";
import "./FocusTimer.css";

const SESSION_DURATIONS = {
  Focus: 25 * 60,        // 25 minutes
  "Short Break": 5 * 60, // 5 minutes
  "Long Break": 15 * 60, // 15 minutes
};

export default function FocusTimer({ onStatsUpdate, currentStats }) {
  const [session, setSession] = useState("Focus");
  const [secondsLeft, setSecondsLeft] = useState(SESSION_DURATIONS["Focus"]);
  const [isRunning, setIsRunning] = useState(false);

  // Use stats from props instead of local state
  const { completedSessions, focusMinutes, streak } = currentStats;

  // Format seconds as MM:SS
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // When session type changes, reset timer
  const handleSessionChange = (type) => {
    setSession(type);
    setSecondsLeft(SESSION_DURATIONS[type]);
    setIsRunning(false);
  };

  // Start/Pause button
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Reset current session
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(SESSION_DURATIONS[session]);
  };

  // Countdown logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          // Update stats when a session finishes using the callback
          if (session === "Focus") {
            onStatsUpdate({
              completedSessions: completedSessions + 1,
              focusMinutes: focusMinutes + SESSION_DURATIONS["Focus"] / 60,
              streak: streak + 1
            });
          } else {
            onStatsUpdate({
              streak: 0
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [isRunning, session, onStatsUpdate, completedSessions, focusMinutes, streak]);

  return (
    <div className="focus-timer-container">
      {/* Header */}
      <div className="focus-header">
        <div className="header-left">
          <h2 className="title">Focus Timer</h2>
          <p className="subtitle">Stay focused with the Pomodoro technique</p>
        </div>
        <div className="header-icons">
          <RotateCcw className="icon" onClick={resetTimer} />
          <Settings className="icon" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon purple"></div>
          <p>Completed Sessions</p>
          <h3>{completedSessions}</h3>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"></div>
          <p>Focus Time</p>
          <h3>{Math.round(focusMinutes)}m</h3>
        </div>
        <div className="stat-card">
          <div className="stat-icon pink"></div>
          <p>Current Streak</p>
          <h3>{streak}</h3>
        </div>
      </div>

      {/* Session Type */}
      <div className="session-type-card">
        <h4>Session Type</h4>
        <div className="session-options">
          <button
            className={`session-btn ${session === "Focus" ? "active" : ""}`}
            onClick={() => handleSessionChange("Focus")}
          >
            🧠 Focus<br />25m
          </button>
          <button
            className={`session-btn ${
              session === "Short Break" ? "active" : ""
            }`}
            onClick={() => handleSessionChange("Short Break")}
          >
            ☕ Short Break<br />5m
          </button>
          <button
            className={`session-btn ${
              session === "Long Break" ? "active" : ""
            }`}
            onClick={() => handleSessionChange("Long Break")}
          >
            🌴 Long Break<br />15m
          </button>
        </div>
      </div>

      {/* Timer Section */}
      <div className="timer-section">
        <div className="timer-circle">
          <h1>{formatTime(secondsLeft)}</h1>
          <p>{session}</p>
        </div>
        <div className="timer-controls">
          <RotateCcw className="control-icon" onClick={resetTimer} />
          <button className="play-btn" onClick={toggleTimer}>
            {isRunning ? "⏸" : "▶"}
          </button>
          <span className="control-icon">›</span>
        </div>
      </div>
    </div>
  );
}
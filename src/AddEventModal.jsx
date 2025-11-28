import React, { useState } from "react";
import "./App.css";

export default function AddEventModal({ onClose, onAdd, defaultDay }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState(defaultDay);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [color, setColor] = useState("#6366f1");

  const colors = ["#6366f1", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#06b6d4", "#84cc16", "#fb923c"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title!");
    onAdd({ title, desc, location, day, startTime, endTime, color });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter event title" required />

          <label>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter event description" />

          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />

          <label>Day</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <div className="time-inputs">
            <div>
              <label>Start Time *</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div>
              <label>End Time *</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
          </div>

          <label>Color</label>
          <div className="color-picker">
            {colors.map((c) => (
              <span
                key={c}
                className={`color-circle ${c === color ? "selected" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              ></span>
            ))}
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-btn">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

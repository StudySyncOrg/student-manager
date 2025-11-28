import React, { useState } from "react";
import AddEventModal from "./AddEventModal";
import "./App.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const addEvent = (event) => {
    setEvents([...events, event]);
    closeModal();
  };

  const filteredEvents = events.filter((e) => e.day === selectedDay);

  return (
    <div className="timetable-container">
      <div className="header-row">
        <div className="header-left">
          <h2 className="title">Timetable</h2>
          <p className="subtitle">Organize your weekly schedule</p>
        </div>
        <button className="add-btn top-add-btn" onClick={openModal}>+ Add Event</button>
      </div>

      <div className="day-tabs">
        {days.map((day) => (
          <button
            key={day}
            className={`day-btn ${selectedDay === day ? "active" : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="events-section">
        <div className="events-header">
          <h3>{selectedDay} Schedule</h3>
          <p>{filteredEvents.length} events scheduled</p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p className="no-events-text">No events scheduled</p>
            <p>Add your first event for {selectedDay}</p>
            <button className="add-btn" onClick={openModal}>+ Add Event</button>
          </div>
        ) : (
          <ul className="event-list">
            {filteredEvents.map((event, i) => (
              <li key={i} className="event-item" style={{ borderLeft: `6px solid ${event.color}` }}>
                <h4>{event.title}</h4>
                <p>{event.startTime} - {event.endTime}</p>
                <p>{event.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && <AddEventModal onClose={closeModal} onAdd={addEvent} defaultDay={selectedDay} />}
    </div>
  );
}

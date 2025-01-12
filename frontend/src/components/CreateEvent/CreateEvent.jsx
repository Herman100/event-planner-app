"use client";
import React, { useState } from "react";
import styles from "./create.module.css";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { eventName, date, time, location };
    console.log("Data:", data);

    try {
      const response = await fetch(
        "https://event-planner-app-vhm3.onrender.com/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setEventName("");
        setDate("");
        setTime("");
        setLocation("");
        alert("Event created successfully");
        const result = await response.json();
        console.log("Event created:", result);
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={styles.container}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submit}>
          Create Event
        </button>
      </form>
    </div>
  );
}

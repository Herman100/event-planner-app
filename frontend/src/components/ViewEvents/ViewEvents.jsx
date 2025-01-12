"use client";
import React, { useEffect, useState } from "react";
import styles from "./viewevents.module.css";
import LoadingSpinner from "../LoadingUI/LoadingSpinner";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("eventName");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://event-planner-app-vhm3.onrender.com/events"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (sortCriteria === "eventName") {
      return a.eventName.localeCompare(b.eventName);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleUpdate = (id) => {
    router.push(`/update/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>View Events</h2>
      <div className={styles.controls}>
        <label htmlFor="sortSelect" className={styles.sortLabel}>
          Sort Events By:
        </label>
        <select
          className={styles.sortSelect}
          value={sortCriteria}
          id="sortSelect"
          onChange={handleSortChange}
        >
          <option value="eventName">Event Name</option>
          <option value="date">Date</option>
        </select>
      </div>
      <ul className={styles.eventList}>
        {currentEvents.map((event) => (
          <li key={event._id} className={styles.eventItem}>
            <div className={styles.eventInfo}>
              <div className={styles.eventHeader}>
                <h3 className={styles.eventName}>{event.eventName}</h3>
                <div className={styles.eventActions}>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleDelete(event._id)}
                  >
                    <MdDelete className={styles.icon} />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleUpdate(event._id)}
                  >
                    <MdEdit className={styles.icon} />
                  </button>
                </div>
              </div>
              <div className={styles.eventDetails}>
                <p className={styles.eventDate}>
                  <strong>Date:</strong> {new Date(event.date).toDateString()}
                </p>
                <p className={styles.eventTime}>
                  <strong>Time:</strong> {event.time}
                </p>
                <p className={styles.eventLocation}>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={styles.paginationButton}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
  <div className="navbar-logo">EventBook</div>
  <ul className="navbar-links">
    <li><Link to="/dashboard">Home</Link></li>
    <li><Link to="/logout">Logout</Link></li>
  </ul>
</nav>

      {/* Dashboard Content */}
      <div className="dashboard-wrapper">
        <h1>Upcoming Events</h1>
        <div className="dashboard-grid">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="event-box" key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p><strong>{new Date(event.event_date).toLocaleString()}</strong></p>
                <Link to={`/events/${event.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

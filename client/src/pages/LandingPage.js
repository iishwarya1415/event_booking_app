import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Items List Page: Displays all items by connecting to the GET endpoint.

const Dashboard = () => {
  // State to store events data
  const [events, setEvents] = useState([]);
  
  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events'); // Fetch all events from API
        setEvents(response.data); // Store the events data in state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the function to fetch events
  }, []); // Empty dependency array means this runs once when the component is mounted

  return (
    <div>
      <h1>Upcoming Events</h1>
      <div>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{new Date(event.event_date).toLocaleString()}</p> {/* Display event date */}
                <Link to={`/events/${event.id}`}>
                  <button>View Details</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

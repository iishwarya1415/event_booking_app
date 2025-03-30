import React, { useState, useEffect } from 'react';
import api from '../axios';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <a href={`/events/${event.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
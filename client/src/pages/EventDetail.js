import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // To access the event id from the URL
import api from '../axios';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.log('Error fetching event details:', error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Venue: {event.venue_name}</p>
      <p>Date: {event.event_date}</p>
      <button>Book Now</button>
    </div>
  );
}

export default EventDetail;

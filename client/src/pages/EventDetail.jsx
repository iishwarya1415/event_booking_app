import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import { useParams, useNavigate } from 'react-router-dom';  // To access the event id from the URL
import api from '../axios';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  
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
  const address = event.venue_address;
  
  const handleCheckout = () => {
    console.log("Navigating to checkout with event:", event);
    navigate('/checkout', { state: { event } });
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Venue: {event.venue_name}</p>
      <p>Date: {event.event_date}</p>

      <h2>Google Map for: {address}</h2>
    <MapContainer address={address} />

      <button onClick={handleCheckout}>Book Now</button>
    </div>
  );
}

export default EventDetail;

import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import { useParams, useNavigate } from 'react-router-dom';
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
  const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleCheckout = () => {
    navigate('/checkout', { state: { event } });
  };

  return (
    <div className="event-wrapper">
      <div className="event-card">
        <h1>{event.title}</h1>
        <p className="venue-line"><strong>Venue:</strong> {event.venue_name}</p>
        <p className="date-line"><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Google Map for:</strong> {address}</p>

        <MapContainer address={address} />

        <button onClick={handleCheckout}>Book Now</button>
      </div>
    </div>
  );
}

export default EventDetail;

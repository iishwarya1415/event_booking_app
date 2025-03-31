import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Item Insertion Page: Allows insertion of a new item by connecting to the POST endpoint.

const Checkout = ({ event, user }) => {
  const [ticketCount, setTicketCount] = useState(1); // Default to 1 ticket
  const navigate = useNavigate();

  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/bookings', {
        event_id: event.id,
        user_id: user.id,
        tickets_count: ticketCount,
      });
      alert('Booking successful!');
      navigate(`/bookings/${response.data.id}`); // Navigate to the booking details page
    } catch (error) {
      console.error('Error during booking', error);
      alert('Failed to complete booking');
    }
  };

  return (
    <div>
      <h1>Checkout for {event.title}</h1>
      <p>Venue: {event.venue_name}</p>
      <p>Date: {new Date(event.event_date).toLocaleString()}</p>

      <div>
        <label>Tickets: </label>
        <input
          type="number"
          value={ticketCount}
          onChange={handleTicketCountChange}
          min="1"
        />
      </div>

      <button onClick={handleCheckout}>Complete Booking</button>
    </div>
  );
};

export default Checkout;

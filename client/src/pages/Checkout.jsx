import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// Checkout component: Allows insertion of a new booking by connecting to the POST endpoint.
const Checkout = ({ user }) => {
  const location = useLocation();
  const event = location.state?.event;
  const [ticketCount, setTicketCount] = useState(1); // Default to 1 ticket
  const navigate = useNavigate();

  const handleTicketCountChange = (e) => {
    setTicketCount(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/bookings', {
        event_id: event.id,
        tickets_count: ticketCount,
      },{
        withCredentials: true // Set here to include cookies in the request
      });
      alert('Booking successful!');
      const booking_data = response.data;
      booking_data.title = event.title;
      navigate(`/bookings/${response.data.id}`,{
        state: { booking: booking_data }, // Pass the booking data
      }); // Navigate to the booking details page
    } catch (error) {
      console.error('Error during booking', error);
      alert('Failed to complete booking');
    }
  };

  return (
      <div className="checkout-wrapper">
      <div className="checkout-card">
      {/* Added title for the checkout page */}
      <h1>Checkout Page</h1>
      
      <h2>Checkout for {event.title}</h2>
      <p className="venue-line"><strong>Venue:</strong> {event.venue_name}</p>
      <p className="date-line"><strong>Date:</strong> {new Date(event.event_date).toLocaleString()}</p>


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
    </div>
  );
};

export default Checkout;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const event = location.state?.event;
  const [ticketCount, setTicketCount] = useState(1);
  const navigate = useNavigate();

  const handleTicketCountChange = (e) => {
    setTicketCount(Number(e.target.value));
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/bookings', {
        event_id: event.id,
        tickets_count: ticketCount,
      }, {
        withCredentials: true
      });

      alert('Booking successful!');
      const booking_data = response.data;
      booking_data.title = event.title;

      navigate(`/bookings/${response.data.id}`, {
        state: { booking: booking_data }
      });
    } catch (error) {
      console.error('Booking failed:', error.response?.data || error.message);
      alert(
        'Failed to complete booking: ' +
        (error.response?.data?.message || error.message)
      );
    }
  };

  // Safeguard: If event is missing
  if (!event) {
    return (
      <p style={{ textAlign: 'center', marginTop: '100px' }}>
        No event found for checkout.
      </p>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">EventBook</div>
        <ul className="navbar-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to={`/events/${event.id}`}>Event Details</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="checkout-wrapper" style={{ marginTop: '90px' }}>
        <div className="checkout-card">
          <h1>Checkout Page</h1>
          <h2>Checkout for {event.title}</h2>
          <p className="venue-line"><strong>Venue:</strong> {event.venue_name}</p>
          <p className="date-line">
            <strong>Date:</strong>{' '}
            {event.event_date
              ? new Date(event.event_date).toLocaleString()
              : 'Date not available'}
          </p>

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
    </>
  );
};

export default Checkout;

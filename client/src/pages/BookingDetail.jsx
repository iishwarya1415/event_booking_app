import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

const BookingDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/bookings/${id}`, { withCredentials: true });
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details', error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleCancelBooking = async () => {
    try {
      await axios.delete(`/bookings/${id}`, { withCredentials: true });
      alert('Booking canceled');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error canceling booking', error);
      alert('Failed to cancel booking');
    }
  };

  const handleUpdateBooking = async () => {
    const newTicketCount = prompt('Enter new ticket count:', booking.tickets_count);
    if (!newTicketCount || isNaN(newTicketCount) || newTicketCount <= 0) {
      alert('Invalid ticket count');
      return;
    }

    try {
      await axios.put(`/bookings/${id}`, { tickets_count: parseInt(newTicketCount) }, { withCredentials: true });
      alert('Booking updated');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating booking', error);
      alert('Failed to update booking');
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <>
      {/* ✅ Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">EventBook</div>
        <ul className="navbar-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to={`/events/${booking.event_id}`}>Event Details</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="booking-wrapper" style={{ marginTop: '90px' }}>
        <div className="booking-card">
          <h1>Booking Details</h1>
          <p><strong>Tickets:</strong> {booking.tickets_count}</p>
          <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}</p>

          <div className="booking-buttons">
            <button className="update-btn" onClick={handleUpdateBooking}>Update Booking</button>
            <button className="cancel-btn" onClick={handleCancelBooking}>Cancel Booking</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;

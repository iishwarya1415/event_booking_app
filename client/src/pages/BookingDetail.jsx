import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate,useLocation } from 'react-router-dom';

const BookingDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/bookings/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details', error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleCancelBooking = async () => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      alert('Booking canceled');
      navigate('/dashboard'); // Redirect to dashboard after cancellation
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
      await axios.put(`/api/bookings/${id}`, { tickets_count: newTicketCount });
      alert('Booking updated');
      navigate('/dashboard'); // Redirect to dashboard after updating booking
    } catch (error) {
      console.error('Error updating booking', error);
      alert('Failed to update booking');
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Event: {booking.events.title}</p>
      <p>Tickets: {booking.tickets_count}</p>
      <p>Booking Date: {new Date(booking.booking_date).toLocaleString()}</p>

      <button onClick={handleUpdateBooking}>Update Booking</button>
      <button onClick={handleCancelBooking}>Cancel Booking</button>
    </div>
  );
};

export default BookingDetail;

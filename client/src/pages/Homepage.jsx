import React from 'react';
import { Link } from 'react-router-dom';
//homepage  public page with website description.

const Homepage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to ShowBuzz</h1>
      <h4>Your Ultimate Destination for Discovering and Booking Events</h4>
      <p>
        Discover and book tickets for the latest events in your area. Our platform provides an easy, secure
        and fast way to explore upcoming events and manage your bookings.
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/login" style={{ marginRight: '1rem', textDecoration: 'none', color: '#646cff' }}>
          Login
        </Link>
        <Link to="/register" style={{ textDecoration: 'none', color: '#646cff' }}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

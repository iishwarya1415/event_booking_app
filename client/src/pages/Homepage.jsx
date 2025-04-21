import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">ShowBuzz</div>
        <ul className="navbar-links">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div style={{ padding: '2rem', textAlign: 'center', marginTop: '90px' }}>
        <h1>Welcome to ShowBuzz</h1>
        <h4>Your Ultimate Destination for Discovering and Booking Events</h4>
        <p>
          Discover and book tickets for the latest events in your area. Our platform provides an easy, secure
          and fast way to explore upcoming events and manage your bookings.
        </p>
      </div>
    </>
  );
};

export default Homepage;

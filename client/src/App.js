import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import the new Dashboard page
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail';
import Checkout from './pages/Checkout'; // Import Checkout page if needed
import BookingsPage from './pages/BookingsPage'; // Import Bookings Page if needed

function App() {
  return (
    <Router>
      <div>
        <h1>Event Booking System</h1>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Update the default route to Dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Add the checkout route */}
          <Route path="/bookings/:id" element={<BookingsPage />} /> {/* Add the bookings route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

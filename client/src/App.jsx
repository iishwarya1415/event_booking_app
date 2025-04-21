import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx'; // Public landing page
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import LandingPage from './pages/LandingPage.jsx'; 
import EventDetail from './pages/EventDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import BookingDetail from './pages/BookingDetail.jsx';
import Logout from './pages/Logout.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route: Public Homepage */}
          <Route path="/" element={<Homepage />} />
          {/* Dashboard or additional landing page */}
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bookings/:id" element={<BookingDetail />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

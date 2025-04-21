// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Optional: clear session from backend
        await axios.post('/logout', {}, { withCredentials: true });

        // Clear any local storage or session data if used
        localStorage.clear();

        // Redirect to homepage
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Error during logout');
        navigate('/');
      }
    };

    performLogout();
  }, [navigate]);

  return <p style={{ textAlign: 'center', marginTop: '100px' }}>Logging out...</p>;
};

export default Logout;

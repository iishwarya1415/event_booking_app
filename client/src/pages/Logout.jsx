import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Optional: clear session from server
        await axios.post('/logout', {}, { withCredentials: true });

        // Clear local storage or session storage if used
        localStorage.clear();

        // ✅ Immediately redirect to homepage
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed');
        navigate('/'); // still send to homepage
      }
    };

    performLogout();
  }, [navigate]);

  return null; // No loading text, just instant redirect
};

export default Logout;

import React, { useState } from 'react';
import api from '../axios'; // Axios instance for API requests

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Try sending to the /api/register endpoint.
      const response = await api.post('/register', { name: username, email, password });
      console.log('Registration success:', response.data);
      setError('');
      navigate('/dashboard');
    } catch (err) {
      // Log detailed error info from the server response if available.
      console.error("Registration error:", err.response ? err.response.data : err.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
      <h1>Register Here</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
    </div>
  );
}

export default Register;

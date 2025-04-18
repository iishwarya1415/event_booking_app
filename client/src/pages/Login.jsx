import React, { useState } from 'react';
import api from '../axios'; // Axios instance for API requests

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password },{
        withCredentials: true // Ensure credentials (cookies) are included
      });
      console.log('Login success:', response.data);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
      <div className="login-wrapper">
        <div className="login-card">
      <h1>Login to your account</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </div>
  );
}

export default Login;

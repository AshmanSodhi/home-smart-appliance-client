// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { validateLoginForm } from '../utils/validationUtils';
import '../styles/styles.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (validateLoginForm(email, password)) {
      // Successful validation
      navigate('/login-success'); // You'll need to create this route/page
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          <button 
            type="button" 
            className="btn" 
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>

      <footer className="footer_det">
        <p>Ashman Sodhi - 23BDS0068 - Web Programming</p>
      </footer>
    </div>
  );
}

export default LoginPage;
// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { validateLoginForm } from '../utils/validationUtils';
import '../styles/styles.css'; 
import Axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!validateLoginForm(email, password)) return;
  
    try {
      const response = await Axios.get('http://localhost:3003/users');
      const users = response.data;
      
      const user = users.find(user => user.email === email && user.pwd === password);
  
      if (user) {
        navigate('/dashboard'); // Navigate to the dashboard if login is successful
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('An error occurred while logging in. Please try again later.');
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
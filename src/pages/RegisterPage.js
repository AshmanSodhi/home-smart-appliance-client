// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { validateRegistrationForm } from '../utils/validationUtils';
import Axios from 'axios'; // Importing Axios
import '../styles/styles.css'; 

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = () => {
    if (validateRegistrationForm(name, email, pwd)) {
      // Create a new user object
      const newUser = { name, email, pwd };

      // Send the POST request to add the user to db.json
      Axios.post('http://localhost:3003/users', newUser)
        .then(response => {
          console.log('User registered:', response.data);
          navigate('/reg-success'); // Redirect to success page
        })
        .catch(error => {
          console.error('Error registering user:', error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Register</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />

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
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          <button 
            type="button" 
            className="btn"
            onClick={handleRegistration}
          >
            Register
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>

      <footer className="footer_det">
        <p>Ashman Sodhi - 23BDS0068 - Web Programming</p>
      </footer>
    </div>
  );
}

export default RegisterPage;

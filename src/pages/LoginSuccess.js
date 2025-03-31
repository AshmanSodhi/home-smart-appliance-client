import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const LoginSuccess = () => {
  return (
    <div>
      <div className="topnav">
        <img className="logo" src="./images/icon.png" alt="Logo" style={{ height: '40px' }} />
        <p>Home Smart Appliance Tracker</p>
        <Link className="active" to="/homepage">Home</Link>
        <Link className="nbAct" to="/login">Login</Link>
        <a className="nbAct">Contact</a>
        <Link className="nbAct" to="/about">About</Link>
      </div>
      
      <div className="container">
        <h2>Login Successful!</h2>
        <p>You have logged in successfully.</p>
        <Link to="/dashboard" className="btn button_color">Go to Dashboard</Link>
      </div>
      
      <br />
      
      <footer className="footer_det">
        <p>Ashman Sodhi - 23BDS0068 - Web Programming</p>
      </footer>
    </div>
  );
};

export default LoginSuccess;
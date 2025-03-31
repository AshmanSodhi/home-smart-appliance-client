// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css'; 

function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const buttons = document.getElementsByClassName("nbAct");

    const handleMouseEnter = (event) => {
      event.target.style.backgroundColor = "white";
    };

    const handleMouseLeave = (event) => {
      event.target.style.backgroundColor = "";
    };

    for (let button of buttons) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      for (let button of buttons) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleLogoClick = () => {
    console.log('Logo clicked!');
    navigate('/');
  };

  return (
    <div className="topnav">
      <img 
        className="logo" 
        src="/images/icon.png" 
        alt="Logo" 
        onClick={handleLogoClick}
        style={{ cursor: 'pointer',
        height: '35px'}}
      />
      <p>Home Smart Appliance Tracker</p>
      <Link to="/" className="active">Home</Link>
      <Link to="/dashboard" className="nbAct">Dashboard</Link>
      <Link to="/scheduler" className="nbAct">Scheduler</Link>
      <a href="#" className="nbAct">Contact</a>
      <Link to="/about" className="nbAct">About</Link>
    </div>
  );
}

export default Navbar;
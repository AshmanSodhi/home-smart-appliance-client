// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/styles.css'; 

function HomePage() {
  const products = [
    {
      id: 'smart_thermo_img',
      image: '../images/thermostat.jpg',
      title: 'Smart Thermostat',
      description: 'Maintain optimal temperature in your home with our energy-efficient smart thermostat.'
    },
    {
      id: 'smart_bulb_img',
      image: '../images/bulb.jpg',
      title: 'Smart Lighting',
      description: 'Control the ambiance of your home with voice-enabled and app-controlled smart lighting.'
    },
    {
      id: 'smart_camera_img',
      image: '/images/images.jpg',
      title: 'Smart Security Camera',
      description: 'Ensure your home\'s safety with real-time monitoring and motion detection alerts.'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to Home Smart Appliance Tracker</h1>
        <p>Manage and monitor your home appliances with ease.</p>
        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>

      <div className="products-section">
        <h2>Our Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product">
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-image" 
                id={product.id}
              />
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer_det">
        <p>Ashman Sodhi - 23BDS0068 - Web Programming</p>
      </footer>
    </div>
  );
}

export default HomePage;
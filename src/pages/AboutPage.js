// src/pages/AboutPage.js
import React from 'react';
import Navbar from '../components/Navbar';

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1>About Me</h1>
          <img 
            src="/images/ashman_profile.jpg" 
            alt="Profile Picture" 
            className="profile-pic" 
          />
          <h1>Ashman Sodhi</h1>
          <p className="bio">
            I am a passionate Data Science student at VIT with a keen interest in Data Science, Machine Learning, Android App Development.  
            I have experience in ML, Competitive Coding, and App Development and love working on innovative projects that solve real-world problems.  
          </p>
        </div>

        <div className="skills-section">
          <h2>Skills & Expertise</h2>
          <ul>
            <li>Machine Learning & AI</li>
            <li>Python, Java, OOPS, JavaScript</li>
            <li>Data Structures & Algorithms</li>
            <li>Android App Development</li>
          </ul>
        </div>

        <div className="contact-section">
          <h2>Contact Me</h2>
          <p>Email: <a href="mailto:ashmansodhi@hotmail.com">ashmansodhi@hotmail.com</a></p>
          <p>GitHub: <a href="https://github.com/AshmanSodhi" target="_blank" rel="noopener noreferrer">github.com/AshmanSodhi</a></p>
        </div>
      </div>

      <footer className="footer_det">
        <p>Ashman Sodhi - 23BDS0068 - Web Programming</p>
      </footer>
    </div>
  );
}

export default AboutPage;
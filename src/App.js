import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import RegistrationSuccessPage from './pages/RegistrationSuccess';
import LoginSuccessPage from './pages/LoginSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login-success" element={<LoginSuccessPage />} />
        <Route path="/reg-success" element={<RegistrationSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
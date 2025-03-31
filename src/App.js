import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import RegistrationSuccessPage from './pages/RegistrationSuccess';
import LoginSuccessPage from './pages/LoginSuccess';
import ApplianceDashboard from './pages/DashboardPage';
import DataAnalysis from './pages/DeviceAnalyticsPage';
import SmartScheduler from './pages/Scheduler';

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
        <Route path="/dashboard" element={<ApplianceDashboard />} />
        <Route path="/data-analysis/:id" element={<DataAnalysis />}/>
        <Route path="/scheduler" element={<SmartScheduler />}/>
      </Routes>
    </Router>
  );
}

export default App;
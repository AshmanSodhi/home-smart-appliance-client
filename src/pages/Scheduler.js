import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/styles.css';
import Navbar from '../components/Navbar2';

const SmartScheduler = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [onTime, setOnTime] = useState('');
  const [offTime, setOffTime] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  // Fetch devices and schedules on component mount
  useEffect(() => {
    fetchDevices();
    fetchSchedules();
    
    // Set up the timer to update current time every minute
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    }, 60000); // Update every minute
    
    // Initial time set
    const now = new Date();
    setCurrentTime(
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    );
    
    return () => clearInterval(timer);
  }, []);

  // Check schedules when current time changes
  useEffect(() => {
    if (!currentTime) return;
    
    schedules.forEach(schedule => {
      if (schedule.onTime === currentTime) {
        updateDeviceStatus(schedule.deviceId, "On");
      } else if (schedule.offTime === currentTime) {
        updateDeviceStatus(schedule.deviceId, "Off");
      }
    });
  }, [currentTime, schedules]);

  const fetchDevices = () => {
    Axios.get('http://localhost:3003/appliances')
      .then(response => setDevices(response.data))
      .catch(error => console.error('Error fetching devices:', error));
  };

  const fetchSchedules = () => {
    Axios.get('http://localhost:3003/schedules')
      .then(response => setSchedules(response.data))
      .catch(error => console.error('Error fetching schedules:', error));
  };

  const updateDeviceStatus = (deviceId, status) => {
    Axios.get(`http://localhost:3003/appliances/${deviceId}`)
      .then(response => {
        const device = response.data;
        
        // Update the status
        Axios.patch(`http://localhost:3003/appliances/${deviceId}`, { status })
          .then(() => {
            console.log(`Device ${device.name} turned ${status ? 'ON' : 'OFF'}`);
            // Refresh devices to show updated status
            fetchDevices();
          })
          .catch(error => console.error('Error updating device status:', error));
      })
      .catch(error => console.error('Error fetching device:', error));
  };

  const handleDeviceChange = (e) => {
    const deviceName = e.target.value;
    setSelectedDevice(deviceName);
    
    // Find device ID based on name
    const device = devices.find(d => d.name === deviceName);
    setSelectedDeviceId(device ? device.id : '');
  };

  const addSchedule = () => {
    if (!selectedDeviceId || !onTime || !offTime) {
      alert('Please select a device and set both on and off times');
      return;
    }

    const newSchedule = { 
      deviceId: selectedDeviceId,
      deviceName: selectedDevice, 
      onTime, 
      offTime 
    };

    Axios.post('http://localhost:3003/schedules', newSchedule)
      .then(response => {
        setSchedules([...schedules, response.data]);
        // Reset form
        setSelectedDevice('');
        setSelectedDeviceId('');
        setOnTime('');
        setOffTime('');
      })
      .catch(error => console.error('Error adding schedule:', error));
  };

  const removeSchedule = (id) => {
    Axios.delete(`http://localhost:3003/schedules/${id}`)
      .then(() => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
      })
      .catch(error => console.error('Error removing schedule:', error));
  };

  // Format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // Get status label and style
  const getStatusLabel = (deviceId) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return { label: 'Unknown', className: '' };
    
    return {
      label: device.status ? 'ON' : 'OFF',
      className: device.status ? 'status-on' : 'status-off'
    };
  };

  return (
    <>
    <Navbar />
    <br></br>
    <div className="scheduler-container">
      <h2>Smart Scheduler</h2>
      <p className="current-time">Current Time: {formatTime(currentTime)}</p>
      
      <div className="schedule-form">
        <div className="form-group">
          <label>Device:</label>
          <select 
            value={selectedDevice} 
            onChange={handleDeviceChange}
            className="form-control"
          >
            <option value="">Select a Device</option>
            {devices.map(device => (
              <option key={device.id} value={device.name}>{device.name}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Turn ON Time:</label>
          <input 
            type="time" 
            value={onTime} 
            onChange={(e) => setOnTime(e.target.value)} 
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Turn OFF Time:</label>
          <input 
            type="time" 
            value={offTime} 
            onChange={(e) => setOffTime(e.target.value)} 
            className="form-control"
          />
        </div>
        
        <button onClick={addSchedule} className="btn add-btn">Add Schedule</button>
      </div>
      
      <div className="schedules-list">
        <h3>Scheduled Devices</h3>
        {schedules.length === 0 ? (
          <p>No schedules set. Add a schedule to automate your devices.</p>
        ) : (
          <table className="schedules-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Turn ON at</th>
                <th>Turn OFF at</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => {
                const status = getStatusLabel(schedule.deviceId);
                return (
                  <tr key={schedule.id}>
                    <td>{schedule.deviceName}</td>
                    <td>{formatTime(schedule.onTime)}</td>
                    <td>{formatTime(schedule.offTime)}</td>
                    <td>
                      <span className={`status-badge ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => removeSchedule(schedule.id)} 
                        className="btn remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      </div>
    </>
  );
};

export default SmartScheduler;
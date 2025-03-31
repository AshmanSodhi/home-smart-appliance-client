import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/styles.css';

const ApplianceDashboard = () => {
  const [appliances, setAppliances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get('http://localhost:3003/appliances')
      .then(response => {
        setAppliances(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAppliances(prevAppliances => 
        prevAppliances.map(appliance => 
          appliance.status === 'On' ? { ...appliance, energy: (parseFloat(appliance.energy) + 0.1).toFixed(1) } : appliance
        )
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const addAppliance = () => {
    const name = prompt("Enter appliance name:");
    const room = prompt("Enter room:");
    if (!name || !room) return;
    const newAppliance = { id: `app${appliances.length + 2}`, name, room, status: 'Off', energy: 0 };
    
    Axios.post('http://localhost:3003/appliances', newAppliance)
      .then(() => setAppliances([...appliances, newAppliance]))
      .catch(error => console.error('Error adding appliance:', error));
  };

  const deleteAppliance = (id) => {
    Axios.delete(`http://localhost:3003/appliances/${id}`)
      .then(() => setAppliances(appliances.filter(appliance => appliance.id !== id)))
      .catch(error => console.error('Error deleting appliance:', error));
  };

  const toggleStatus = (id, currentStatus) => {
    const updatedStatus = currentStatus === 'On' ? 'Off' : 'On';
    Axios.patch(`http://localhost:3003/appliances/${id}`, { status: updatedStatus })
      .then(() => {
        setAppliances(appliances.map(appliance => 
          appliance.id === id ? { ...appliance, status: updatedStatus } : appliance
        ));
      })
      .catch(error => console.error('Error toggling status:', error));
  };

  const editAppliance = (id, oldName, oldRoom) => {
    const newName = prompt("Enter new name:", oldName);
    const newRoom = prompt("Enter new room:", oldRoom);
    if (!newName || !newRoom) return;
    
    Axios.patch(`http://localhost:3003/appliances/${id}`, { name: newName, room: newRoom })
      .then(() => {
        setAppliances(appliances.map(appliance => 
          appliance.id === id ? { ...appliance, name: newName, room: newRoom } : appliance
        ));
      })
      .catch(error => console.error('Error updating appliance:', error));
  };

  if (isLoading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">Error loading dashboard: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Dashboard</h2>
        
        <button className="btn" onClick={addAppliance}>Add Appliance</button>
        
        <table>
          <thead>
            <tr>
              <th>Appliance</th>
              <th>Room</th>
              <th>Status</th>
              <th>Energy (kWh)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appliances.map((appliance) => (
              <tr key={appliance.id}>
                <td>{appliance.name}</td>
                <td>{appliance.room}</td>
                <td>{appliance.status}</td>
                <td>{appliance.energy}</td>
                <td>
                  <button className="btn" onClick={() => toggleStatus(appliance.id, appliance.status)}>Toggle</button>
                  <button className="btn" onClick={() => editAppliance(appliance.id, appliance.name, appliance.room)}>Edit</button>
                  <button className="btn" onClick={() => deleteAppliance(appliance.id)}>Delete</button>
                  <button className="btn">
                    <Link to={`/data-analysis/${appliance.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                      View Analysis
                    </Link>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      <footer className="footer_det">
        <p>Ashman Sodhi - 23BDS0068 - Web Programming</p>
      </footer>
    </div>
  );
};

export default ApplianceDashboard;

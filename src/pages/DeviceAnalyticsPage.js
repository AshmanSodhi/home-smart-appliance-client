import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import '../styles/styles.css';

const DataAnalysisPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('daily');
  
  useEffect(() => {
    Axios.get(`http://localhost:3003/appliances/${id}`)
      .then(response => {
        setData(response.data.history || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  useEffect(() => {
    if (data.length === 0) return;
    
    // Filter data based on selected time frame (Daily, Weekly, Monthly)
    switch(timeFrame) {
      case 'weekly':
        setFilteredData(filterByWeek(data));
        break;
      case 'monthly':
        setFilteredData(filterByMonth(data));
        break;
      default:
        setFilteredData(filterByDay(data));
    }
  }, [timeFrame, data]);

  const filterByDay = (data) => {
    return [...data];
  };

  const filterByWeek = (data) => {
    if (data.length === 0) return [];
    
    // Group by week number of the year
    const groupedByWeek = {};
    data.forEach(item => {
      const weekNumber = moment(item.date).week();
      if (!groupedByWeek[weekNumber]) {
        groupedByWeek[weekNumber] = {
          date: `Week ${weekNumber}`,
          energy: 0,
          count: 0
        };
      }
      groupedByWeek[weekNumber].energy += item.energy || 0;
      groupedByWeek[weekNumber].count += 1;
    });
    
    // Convert to array and calculate averages
    return Object.values(groupedByWeek).map(week => ({
      date: week.date,
      energy: week.count > 0 ? +(week.energy / week.count).toFixed(2) : 0
    }));
  };

  const filterByMonth = (data) => {
    if (data.length === 0) return [];
    
    // Group by month
    const groupedByMonth = {};
    data.forEach(item => {
      const monthKey = moment(item.date).format('MMM YYYY');
      if (!groupedByMonth[monthKey]) {
        groupedByMonth[monthKey] = {
          date: monthKey,
          energy: 0,
          count: 0
        };
      }
      groupedByMonth[monthKey].energy += item.energy || 0;
      groupedByMonth[monthKey].count += 1;
    });
    
    // Convert to array and calculate averages
    return Object.values(groupedByMonth).map(month => ({
      date: month.date,
      energy: month.count > 0 ? +(month.energy / month.count).toFixed(2) : 0
    }));
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const getMaxMinConsumption = () => {
    if (filteredData.length === 0) {
      return { max: 0, min: 0, maxDay: null, minDay: null };
    }
    
    const max = Math.max(...filteredData.map(d => d.energy || 0));
    const min = Math.min(...filteredData.map(d => d.energy || 0));
    
    // Finding the day with max and min energy consumption
    const maxDay = filteredData.find(d => d.energy === max)?.date || 'N/A';
    const minDay = filteredData.find(d => d.energy === min)?.date || 'N/A';
    
    return { max, min, maxDay, minDay };
  };

  const { max, min, maxDay, minDay } = getMaxMinConsumption();

  return (
    <div>
      <Navbar />
      <h2>Data Analysis for {data.length > 0 ? data[0].name : "Appliance"}</h2>
      
      {/* Dropdown for selecting time frame */}
      <div className="filter-controls">
        <label>Filter by: </label>
        <select onChange={handleTimeFrameChange} value={timeFrame}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      
      {filteredData.length > 0 ? (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Bar dataKey="energy" fill="#8884d8" name="Energy (kWh)" />
            </BarChart>
          </ResponsiveContainer>
          </div>
          
          <div className="consumption-summary" style={{
            textAlign: 'center',
            margin: '20px auto 0',
            padding: '15px',
            backgroundColor: 'rgba(240, 240, 255, 0.7)',
            borderRadius: '8px'
          }}>
            <h3>Energy Consumption Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <h4>Highest Energy Consumption:</h4>
                <p>Period: {maxDay} | Energy: {max} kWh</p>
              </div>
              <div>
                <h4>Lowest Energy Consumption:</h4>
                <p>Period: {minDay} | Energy: {min} kWh</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chart-container">
        <p>No data available for the selected device.</p>
        </div>
      )}
    </div>
  );
};

export default DataAnalysisPage;
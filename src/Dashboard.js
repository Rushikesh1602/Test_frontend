import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; 
import GenderDistribution from './GenderDistribution';
import StatewiseCardsIssued from './StatewiseCardsIssued';
import NatureOfJob from './NatureOfJob';
import WeeklyCustomerReached from './WeeklyCustomerReached';
import LeadsReached from './LeadsReached'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://localhost:5000/data')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all data
        // Extracting unique state names from the data
        const uniqueStates = Array.from(new Set(response.data.map(item => item['State'])));
        setStates(uniqueStates);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Handle state change for filtering data
  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    if (newState === '') {
      setFilteredData(data); // Reset filtered data to all data
    } else {
      const newData = data.filter(item => item['State'] === newState);
      setFilteredData(newData);
    }
  };

  return (
    <div className="dashboard-container">
      {/* <h1 className="dashboard-title">Customer Feedback Analysis Dashboard</h1> */}
      <div className="state-filter-container">
        <label htmlFor="state-filter">Filter by State: </label>
        <select id="state-filter" value={selectedState} onChange={handleStateChange}>
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="box-container">
        <div className="box leads-reached">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <LeadsReached data={filteredData} />
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <GenderDistribution data={filteredData} />
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <StatewiseCardsIssued data={filteredData} />
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <NatureOfJob data={filteredData} />
        </div>
      </div>
      <div className="box-container">
        <div className="box">
          <WeeklyCustomerReached data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';
import './WeeklyCustomerReached.css'; 

const WeeklyCustomerReached = ({ data }) => {
  const [selectedState, setSelectedState] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [states, setStates] = useState([]);

  useEffect(() => {
    // Extracting unique state names from the data
    const uniqueStates = Array.from(new Set(data.map(item => item['State'])));
    setStates(uniqueStates);

    // Set filtered data initially to show data for all states
    setFilteredData(data);
  }, [data]);

  const weeklyData = filteredData.reduce((acc, item) => {
    const dateString = item['_submission_time'];
    const format = 'MM/DD/YYYY HH:mm:ss'; 
    const week = moment(dateString, format).startOf('week').format('YYYY-MM-DD');

    if (!selectedState || item['State'] === selectedState) {
      if (!acc[week]) {
        acc[week] = 0;
      }
      acc[week]++;
    }
    return acc;
  }, {});

  const chartData = Object.keys(weeklyData).map(week => ({
    name: week,
    count: weeklyData[week]
  }));

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    if (newState) {
      const newData = data.filter(item => item['State'] === newState);
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Weekly Customer Reached</h2>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">All States</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <LineChart width={600} height={400} data={chartData}>
        <XAxis dataKey="name" tickFormatter={date => moment(date).format('MM/DD')} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" animationDuration={1000} />
      </LineChart>
    </div>
  );
};

export default WeeklyCustomerReached;

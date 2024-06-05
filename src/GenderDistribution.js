import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'; // Import Tooltip from recharts
import './GenderDistribution.css'; // Import CSS file

const GenderDistribution = ({ data }) => {
  const maleCount = data.filter(item => item.Gender === 'Male').length;
  const femaleCount = data.filter(item => item.Gender === 'Female').length;

  const otherCount = data.length - maleCount - femaleCount; // Calculate count for other genders

  const genderData = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount },
    { name: 'Data not Found', value: otherCount } // Add data for "Data not Found"
  ];

  const COLORS = ['#0088FE', '#FF8042', '#FFBB28']; // Add color for "Data not Found"

  return (
    <div>
      <h2>Gender Distribution</h2>
      <ResponsiveContainer width="100%" height={430}>
        <PieChart>
          <Pie
            data={genderData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip /> {}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', marginRight: '20px' }}>
          <span style={{ color: COLORS[0] }}>Male: {maleCount}</span>
        </div>
        <div style={{ display: 'inline-block', marginRight: '20px' }}>
          <span style={{ color: COLORS[1] }}>Female: {femaleCount}</span>
        </div>
        <div style={{ display: 'inline-block' }}>
          <span style={{ color: COLORS[2] }}>Data not Found: {otherCount}</span>
        </div>
      </div>
    </div>
  );
};

export default GenderDistribution;

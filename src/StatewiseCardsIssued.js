import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './StatewiseCardsIssued.css'; 

const StatewiseCardsIssued = ({ data }) => {
  const stateData = data.reduce((acc, item) => {
    const state = item.State;
    if (!acc[state]) {
      acc[state] = 0;
    }
    acc[state]++;
    return acc;
  }, {});

  const chartData = Object.keys(stateData).map(state => ({
    name: state,
    count: stateData[state]
  }));

  return (
    <div className="chart-container"> {}
      <h2 className="chart-title">State-wise Count of Cards Issued Successfully</h2>
      <div className="chart-wrapper"> {}
        <BarChart width={650} height={400} data={chartData} layout="vertical"> {}
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} interval={0} mirror={false} tickMargin={10} /> {/* Increase width and adjust margins */}
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default StatewiseCardsIssued;

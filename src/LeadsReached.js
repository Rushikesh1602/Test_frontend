import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import './LeadsReached.css'; // Ensure CSS is set up for layout and aesthetics

const LeadsReached = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Categorize leads by 'State'
  const stateCounts = data.reduce((acc, lead) => {
    const state = lead.State || 'Unknown'; // Assuming the Excel field 'State' maps directly to lead.State
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  // Create chart data from the state counts
  const chartData = Object.keys(stateCounts).map(state => ({
    name: state,
    value: stateCounts[state]
  }));

  // Calculate total count
  const totalCount = chartData.reduce((total, entry) => total + entry.value, 0);

  return (
    <div className="leads-reached-container">
      <h2 className="leads-title">Leads Reached by State</h2>
      <div className="total-count">{`Total: ${totalCount}`}</div>
      <PieChart width={400} height={350}>
        <Pie
          data={chartData}
          cx={100}
          cy={200}
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="right" // Adjust alignment to right
          verticalAlign="middle"
          iconSize={10}
          iconType="circle"
        />
      </PieChart>
    </div>
  );
};

export default LeadsReached;

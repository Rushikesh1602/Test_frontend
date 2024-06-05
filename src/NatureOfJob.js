import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NatureOfJob = ({ data }) => {
  
  const natureOfJobsSet = new Set(data.map(item => item['Nature of Job']));
  const natureOfJobs = Array.from(natureOfJobsSet);

  
  const counts = data.reduce((acc, curr) => {
    const job = curr['Nature of Job'];
    const cardIssued = curr['Is card successfully issued to the customer?'] === 'Yes' ? 1 : 0;
    acc[job] = acc[job] || { job, customers: 0, cardsIssued: 0 };
    acc[job].customers++;
    acc[job].cardsIssued += cardIssued;
    return acc;
  }, {});

 
  const chartData = natureOfJobs.map(job => ({
    job,
    customers: counts[job] ? counts[job].customers : 0,
    cardsIssued: counts[job] ? counts[job].cardsIssued : 0
  }));

  return (
    <div>
      <h2>Count of Nature of Job and Cards Issued Successfully</h2>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="job" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="customers" fill="#8884d8" name="Customers" />
          <Bar dataKey="cardsIssued" fill="#82ca9d" name="Cards Issued" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NatureOfJob;

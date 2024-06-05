import React from 'react';
import './App.css'; // Import general styles
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">Customer Feedback Analysis Dashboard</h1> {/* Add class for styling */}
      </header>
      <main className="main-content"> {/* Add class for styling */}
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

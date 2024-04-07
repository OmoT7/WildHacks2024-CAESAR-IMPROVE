import './App.css';
import PieChart from './PieChart';
import React from 'react';
import { useDegreeData } from './pieload'; // Import the function

function App() {
  const data = useDegreeData(); // Use the function to get the data

  return (
    <div className="App">
      <header className="App-header">
        <PieChart data={data} />
      </header>
    </div>
  );
}

export default App;
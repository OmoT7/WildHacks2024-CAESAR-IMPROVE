import './App.css';
import Navbar from "./Navbar"
import Home from "./pages/Home"
import DegreeProgress from "./pages/DegreeProgress"
import Courses from "./pages/Courses"
import { Route, Routes } from "react-router-dom"
import PieChart from './PieChart';
import React from 'react';
import { useDegreeData } from './pieload'; // Import the function

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/degree-progress" element={<DegreeProgress />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>      
      </div>
    </>
  )
}

export default App;


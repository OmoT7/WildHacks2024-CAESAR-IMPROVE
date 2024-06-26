import './App.css';
import './pages/Calendar'
import Navbar from "./Navbar"
import Home from "./pages/Home"
import DegreeProgress from "./pages/DegreeProgress"
import Courses from "./pages/Courses"
import { Route, Routes } from "react-router-dom"
import Card from "./Card"
import data from "./pages/data"
import React from 'react'; // Import the function

function App() {
  const card = data.map((item) => {
    return <Card image = {item.img} name={item.name} des={item.des} />;
  });

   // Use the function to get the data

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


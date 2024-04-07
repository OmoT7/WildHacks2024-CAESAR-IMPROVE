import './App.css';
import Navbar from "./Navbar"
import Home from "./pages/Home"
import DegreeProgress from "./pages/DegreeProgress"
import Classes from "./pages/Classes"
import { Route, Routes } from "react-router-dom"
import Card from "./Card"
import data from "./data"

function App() {
  const card = data.map((item) => {
    return <Card image = {item.img} name={item.name} des={item.des} />;
  });

  return (
    <>
      {/* <h1 className="heading">Web Development</h1>
      <div className="header_underline"></div>
      <div className="wrapper">{card}</div> */}
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/degree-progress" element={<DegreeProgress />} />
          <Route path="/classes" element={<Classes />} />
        </Routes>
      </div>
    </>
  )
}

export default App;



import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Player from './pages/Player';
import Header from "./components/Header";

function App() {
  
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/video/" element={<Home />} />
        <Route path="/video/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;

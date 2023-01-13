import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Player from './pages/Player';

function App() {

  return (
    <div className="wrapper">
      <div style={{height: '50px', background: 'green', color: 'white', textAlign: 'center', marginBottom: '10px'}}>
        Simple header
      </div>
      <Routes>
        <Route path="/video/" element={<Home />} />
        <Route path="/video/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;

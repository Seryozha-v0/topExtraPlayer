import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Player from './pages/Player';

function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/video/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;

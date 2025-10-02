import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;

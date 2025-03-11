import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './styles/App.css';

const App = () => {
  return (
    <div className="container text-center">
      <h1>Chef's Kiss</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <div className="box">Home</div>
        </Link>
        <Link to="/preset-timers" className="nav-link">
          <div className="box">Preset Timers</div>
        </Link>
        <Link to="/custom-timers" className="nav-link">
          <div className="box">Custom Timers</div>
        </Link>
        <Link to="/settings" className="nav-link">
          <div className="box">Settings</div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
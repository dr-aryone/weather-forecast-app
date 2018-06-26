import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

export default () => (
  <div className="Header">
    <div className="Header__title">
      <NavLink to='/weather-forecast-app'>Weather Forecast App</NavLink>
    </div>
  </div>
);

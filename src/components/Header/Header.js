import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

export default () => (
  <div className="Header">
    <div className="Header__title">
      <NavLink to='/'>
        Weather Forecast App
      </NavLink>
    </div>
  </div>
);

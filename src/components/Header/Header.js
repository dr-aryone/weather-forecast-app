import React from 'react';
import { NavLink } from 'react-router-dom';

import resources from '../../utils/resources';

import './Header.css';

const { APP_ROOT } = resources;

export default () => (
  <div className="Header">
    <div className="Header__title">
      <NavLink to={APP_ROOT}>Weather Forecast App</NavLink>
    </div>
  </div>
);

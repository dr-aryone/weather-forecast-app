import React from 'react';
import { Route } from 'react-router-dom';

import cities from '../../utils/cities';

import CityItem from './CityItem';

export default () => {
  const getCityRoutes = () => {
    return cities.map((elem, index) => (
      <Route path='/city/:id' component={CityItem} />
    ));
  }

  return (
    <div>
      {getCityRoutes()}
    </div>
  )
};

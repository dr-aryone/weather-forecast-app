import React from 'react';
import { Route, Link } from 'react-router-dom';

import City from './City';

export default ({ match }) => {
  return (
    <div>
      <ul>
        <li key={1}><Link to={`${match.url}/teresina`}>Teresina</Link></li>
        <li key={2}><Link to={`${match.url}/san-francisco`}>San Francisco</Link></li>
        <li key={3}><Link to={`${match.url}/almere`}>Almere</Link></li>
        <li key={4}><Link to={`${match.url}/new-york`}>New York</Link></li>
        <li key={5}><Link to={`${match.url}/new-zealand`}>New Zealand</Link></li>
      </ul>
      <Route path={`${match.url}/:id`} component={City} />
    </div>
  )
};

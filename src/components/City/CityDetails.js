import React from 'react';

import './CityDetails.scss';

export default ({ match }) => {
  return (
    <div className="CityDetails">
      <h2>City details {match.params.id}</h2>
    </div>
  )
};

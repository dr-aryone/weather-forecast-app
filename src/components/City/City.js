import React from 'react';

export default ({ match }) => {
  console.log('City.js', match);

  return (
    <div>
      <h2>City details {match.params.id}</h2>
    </div>
  )
};

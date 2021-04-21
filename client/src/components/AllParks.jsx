import React from 'react';
import Park from './Park.jsx';

export default function AllParks({ parks }) {
  return (
    <div className="main">
      <h1 parks={parks}>Park Pack</h1>
      { Object.values(parks).map((park) => <Park data={park} key={park._id} />)}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Park from './Park.jsx';
import axios from 'axios';


export default function AllParks({ parks }) {
  console.log('all parks', typeof parks);
  return (
    <div className="main">
      <h1 parks={parks}>Park Pack</h1>
      { Object.values(parks).map(park => {
        return <Park data={park} key={park._id} />
      })}
    </div>
  );
}

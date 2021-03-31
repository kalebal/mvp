import React, { useState, useEffect } from 'react';
import Park from './Park.jsx';
import axios from 'axios';


export default function AllParks({ parks }) {
  if (Object.entries(parks)) {
    return (
      <>
      {Object.values(parks).map(park => {
        return <Park data={park} key={park.id} />
      })}
      </>
    )
  }
  return (
      <div className="main">
        <h1 parks={parks}>Park Pack</h1>
      </div>
    );

}

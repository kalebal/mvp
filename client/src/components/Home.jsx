import React, { useState, useEffect } from 'react';
import Park from './Park.jsx';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function AllParks({ parks }) {
  const url = '/api/parks';
  console.log('home parks: ', parks)
  return (
    <div className="main">
      <h1>Park Pack</h1>
      <h3>Find a pack at</h3>
      {Object.values(parks).map(park => {
        return (
          <Link to={{ pathname:`/park/${park.id}`}}
          key={park.id}>
          <div key={park.name}> {park.name}
          </div>
          </Link>
          );
      })}
    </div>
  );

}
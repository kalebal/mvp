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
  const url = 'http://localhost:3000/api/parks';

  return (
    <div className="main">
      <h1>Park Pack</h1>
      <h3>Find a pack at</h3>
      {parks.map(park => {
        return (
          <Link to={{ pathname:`/park/${park._id}`}}>
          <div key={park.name}> {park.name}
          </div>
          </Link>
          );
      })}
    </div>
  );

}
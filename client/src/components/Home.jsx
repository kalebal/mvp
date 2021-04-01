import React, { useState, useEffect } from 'react';
import Park from './Park.jsx';
import Form from './Form.jsx';
import Search from './Search.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Home({ parkLocations, parks }) {
  let mostPopular = Object.values(parks).sort((a, b) => {
    return b.totalAttendees - a.totalAttendees;
  })
  return (
    <div className="main">
      <div>

      <h1>Park Pack</h1>
      <h3>Most Popular Today: </h3>
      {mostPopular.map((park) => {
        if (park.totalAttendees > 5) {
          return (
            <div> {`${park.name}: ${park.totalAttendees} dogs` }
            </div>
          )
        }
      })}
      {Object.entries(parkLocations).map(location => {
        return (
          <>
          <h3>Find a park in {location[0]} </h3>
          {Object.values(location[1]).map(park => {
          return (
          <>
          <Link to={{ pathname:`/park/${park.id}`}}
          key={park.id}>
          <div key={park.name}> {park.name}
          </div>
          </Link>
          </>)
          })}
          </>
        );
      })}
      </div>
      <aside>
      <Form></Form>
      <Search/>
      </aside>
    </div>
  );

}
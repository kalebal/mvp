import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import axios from 'axios';
import AllParks from './AllParks.jsx';
import Park from './Park.jsx';
import Home from './Home.jsx';

export default function App() {
  const [parks, getParks] = useState({});
  const [parkLocations, getParkLocations] = useState({});
  useEffect(() => { getAllParks(); }, []);

  const url = '/api/parks';
  const getAllParks = () => {
    const allParkLocations = {};
    const allParks = [];
    axios.get(`${url}`)
      .then((response) => {
        response.data.forEach((park) => {
          if (!allParkLocations[park.county]) {
            allParkLocations[park.county] = [];
          }
          allParkLocations[park.county].push(park);
          allParks[park.id] = park;
        });
        getParks(allParks);
        getParkLocations(allParkLocations);
      })
      .catch((error) => console.error(`Err: ${error}`));
  };

  return (
    <Router>
      <div id="router">
        <nav>
          <ul id="nav-ul">
            <li className="nav-li">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-li">
              <Link to="/allparks">All Parks</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/allparks">
            <AllParks parks={parks}/>
          </Route>
          <Route
            exact
            path="/park/:id"
            render={(props) => {
              const { id } = props.match.params;
              return (<Park data={parks[id]} />);
            }}
          />
          <Route exact path="/">
            <Home parkLocations={parkLocations} parks={parks}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import AllParks from './AllParks.jsx';
import Park from './Park.jsx';
import Home from './Home.jsx';
import axios from 'axios';


export default function App() {
  const [parks, getParks] = useState([]);
  useEffect(() => {
    getAllParks();
  }, []);

  const url = 'http://localhost:3000/api/parks';

  const getAllParks = () => {
    axios.get(`${url}`)
      .then((response) => {
        const allParks = response.data;
        getParks(allParks);
      })
      .catch(error => console.error(`Err: ${error}`));
  }
  console.log(parks)
  return (
    <Router>
      <div>
        <nav>
          <ul id='nav-ul'>
            <li className='nav-li'>
              <Link to="/">Home</Link>
            </li>
            <li className='nav-li'>
              <Link to="/allparks">All Parks</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/allparks">
            <AllParks parks={parks}/>
          </Route>
          <Route exact path="/">
            <Home parks={parks}/>
          </Route>
          <Route exact path="/park/:id" render={(props) => {
          const id = props.match.params.id;
          console.log('render park for id', id, parks[id]);
          return (<Park data={parks[id - 1]}></Park>);
          }}>

          </Route>
        </Switch>
      </div>
    </Router>
  );
}
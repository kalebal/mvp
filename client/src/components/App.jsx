import React, { useState, useEffect } from 'react';
import Park from './Park.jsx';
import axios from 'axios';


export default function App() {
  const url = 'http://localhost:3000/parks';
  const [parks, getParks] = useState([]);


  useEffect(() => {
    getAllParks();
  }, []);
  const getAllParks = () => {
    axios.get(`${url}`)
    .then((response) => {
      const allParks = response.data;
      getParks(allParks);
    })
    .catch(error => console.error(`Err: ${error}`));
  }
  return (
      <div className="main">
        <h1 parks={parks}>Park Pack</h1>
        { parks.map(park => {
          return <Park data={park} key={park.name}/>
        })}
      </div>
    );

}

// export default App;
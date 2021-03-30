import React, { useState, useEffect } from 'react';
import TimeBlock from './TimeBlock.jsx';

export default function Park({ data }) {
  let totalAttendees = parseInt(data.totalAttendees) || 0;
  const [count, setCount] = useState(totalAttendees);

  let times = [];

  for (var i = parseInt(data.openTime); i < 12 + parseInt(data.closeTime); i++) {
    times.push(i);
  }

  const url = 'http://localhost:3000/parks';
  const incrementParkAttendance = () => {
    axios.put(`${url}`, {park_id: data._id, hour: 0})
      .then((response) => {
        const allParks = response.data;
        getParks(allParks);
      })
      .catch(error => console.error(`Err: ${error}`));
  }

  return (
    <div className="parkContainer">
    <h3>{data.name}</h3>
    <h5>Today's Potential Friends: {count}</h5>
      <ul>
        {times.map((time) => {
          return <TimeBlock key={time} time={time} onClick={() => setCount(count + 1)}/>;
        })}
      </ul>
    </div>
  )
}
import React, { useState, useEffect } from 'react';
import TimeBlock from './TimeBlock.jsx';
import axios from 'axios';

export default function Park({ data }) {
  let totalAttendees = parseInt(data.totalAttendees) || 0;
  const [count, setCount] = useState(totalAttendees);

  let times = [];

  for (var i = parseInt(data.openTime); i < 12 + parseInt(data.closeTime); i++) {
    times.push(i);
  }

  const url = '/api/parks';
  const incrementParkAttendance = (time) => {
    axios.put(`${url}/${data.id}`, {hour: time})
      .then((response) => {
        const allParks = response.data;
      })
      .catch(error => console.error(`Err: ${error}`));
  }
  return (
    <div className="parkContainer">
    <h3>{data.name}</h3>
    <h5>Today's Potential Friends: {count}</h5>
      <ul>
        {times.map((time) => {
          return <TimeBlock
          data={data.hourlyAttendance[time]}
          key={time}
          time={time}
          onClick={() => {
            setCount(count + 1);
            incrementParkAttendance(time);
          }}/>;
        })}
      </ul>
    </div>
  )
}
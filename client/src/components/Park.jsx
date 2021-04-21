import React, { useState } from 'react';
import axios from 'axios';
import TimeBlock from './TimeBlock.jsx';

export default function Park({ data }) {
  const totalAttendees = parseInt(data.totalAttendees, 10) || 0;
  const [count, setCount] = useState(totalAttendees);

  const times = [];
  // get list of hours the park is open
  for (let i = parseInt(data.openTime, 10); i < 12 + parseInt(data.closeTime, 10); i += 1) {
    times.push(i);
  }

  const url = '/api/parks';
  // handler for + click
  const incrementParkAttendance = (time) => {
    axios.put(`${url}/${data.id}`, { hour: time })
      .then((response) => {
        const allParks = response.data;
      })
      .catch((error) => console.error(`Err: ${error}`));
  };
  return (
    <div className="parkContainer">
      <h3>{data.name}</h3>
      <h5>
        Today's Potential Friends:
        {count}
      </h5>
      <ul>
        {times.map((time) => (
          <TimeBlock
            data={data.hourlyAttendance[time]}
            key={time}
            time={time}
            onClick={() => {
              setCount(count + 1);
              incrementParkAttendance(time);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import TimeBlock from './TimeBlock.jsx';

export default function Park({ data }) {
  const [count, setCount] = useState(0);

  let times = [];

  for (var i = parseInt(data.openTime); i < 12 + parseInt(data.closeTime); i++) {
    times.push(`${i}:00 - ${i + 1}:00`);
  }


  return (
    <div className="parkContainer">
    <h3>{data.name}</h3>
    <h5>Today's Potential Friends: {count}</h5>
      <ul>
        {times.map((time) => {
          return <TimeBlock time={time} onClick={() => setCount(count + 1)}/>;
        })}
      </ul>
    </div>
  )
}
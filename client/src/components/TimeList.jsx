import React from 'react';
import Button from './Button.jsx';

let TimeList = () => {
  let times = [];

  for (var i = 12; i < 23; i++) {
    times.push(`${i}:00 - ${i + 1}:00`);
  }

  return (
    <ul>
      {times.map((time) => {
        return <li key={time}>{time} <Button></Button></li>;
      })}
    </ul>
  )
};

export default TimeList;
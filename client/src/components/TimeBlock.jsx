import React, { useState, useEffect } from 'react';


export default function TimeBlock({ time, onClick }) {
  const [count, setCount] = useState(0);

  return (
    <li key={time}>{time}
      <button onClick={() => {
        onClick();
        setCount(count + 1); }}> + </button>
        {count}
        </li>
  );

}
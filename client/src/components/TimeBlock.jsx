import React, { useState, useEffect } from 'react';


export default function TimeBlock({ time, onClick, data }) {
  const [count, setCount] = useState(data.attendance);
  const [showButton, toggleButton] = useState(true);
  let timeText = `${time}:00 - ${time + 1}:00`;

  return (
    <li key={time}>
      <div className="hourContainer">
      {timeText}
      <button
      disabled={!showButton}
      onClick={() => {
        toggleButton();
        onClick();
        setCount(count + 1); }}> + </button>
      </div>
      <div className="hourCount">
      {count}
      </div>
        </li>
  );
}
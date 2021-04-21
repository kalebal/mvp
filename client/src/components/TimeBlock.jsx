import React, { useState } from 'react';

export default function TimeBlock({ time, onClick, data }) {
  // todo: add default prop to handle no attendance
  let attendance = 0;
  if (data && data.attendance) {
    attendance = data.attendance;
  }
  const [count, setCount] = useState(attendance);
  const [showButton, toggleButton] = useState(true);
  const timeText = `${time}:00 - ${time + 1}:00`;

  return (
    <li key={time}>
      <div className="hourContainer">
        {timeText}
        <button
          type="button"
          className="hourButton"
          disabled={!showButton}
          onClick={() => {
            toggleButton();
            onClick();
            setCount(count + 1);
          }}
        >
          {' '}
          +
        </button>
      </div>
      <div className="hourCount">
        {count}
      </div>
    </li>
  );
}

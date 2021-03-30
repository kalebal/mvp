import React, { useState } from 'react';
import TimeList from './TimeList.jsx'

const App = () => {
  const [currentPark, setCurrentPark] = useState('test');

  return (
    <div className="main">
      <h1>Park Pack</h1>
      <h3>Carrboro Dog Park</h3>
      <TimeList></TimeList>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import useInput from './useInput.jsx';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Search() {
  const { inputs, handleChange, handleSubmit } = useInput(search);
  // todo: connect to API
  // return list of matching park names
  // add park list below search
  const search = () => {
    console.log('search');
  }
  return (
    <div className="form">
      <h3>Find A Park</h3>
      <div>
        <label>Search:</label>
        <input
          onChange={handleChange}
          value={inputs.name}
          type="text"
          name="search"
          id="search"></input>
      </div>
    </div>
  );

}
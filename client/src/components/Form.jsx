/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';
import useInput from './useInput.jsx';

export default function Form() {
  const url = '/api/parks';
  const addPark = () => {
    alert(`
    Adding:
    Name: ${inputs.name}
    Address: ${inputs.address}
    open time: ${inputs.openTime}
    close: ${inputs.closeTime}
    `);
    return axios.post(url, { data: inputs });
  };
  const { inputs, handleChange, handleSubmit } = useInput(addPark);
  return (
    <div className="add-park-form">
      <h3>Add A Park</h3>
      <div className="form-container">
        <label>Name:</label>
        <input
          onChange={handleChange}
          value={inputs.name}
          type="text"
          name="name"
          id="name"
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={inputs.address}
          onChange={handleChange}
          id="address"
        />
      </div>

      <div className="form-container">
        <label>Opens:</label>
        <input
          id="open-time"
          type="time"
          name="openTime"
          value={inputs.open}
          onChange={handleChange}
        />
        <label>Closes:</label>
        <input
          id="close-time"
          type="time"
          name="closeTime"
          value={inputs.close}
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import TimeList from './TimeList.jsx';

export default function Park({ data }) {
  console.log(data);
  return (
    <>
    <h3>{data.name}</h3>
    <TimeList/>
    </>
  )
}
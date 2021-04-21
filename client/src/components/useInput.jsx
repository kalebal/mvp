import { useState } from 'react';

// custom React Hook to handle Input Forms
const useInput = (callback) => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event) => {
    console.log('submit', inputs);
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleChange = (event) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return { handleSubmit, handleChange, inputs };
};

export default useInput;

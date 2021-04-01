import { useState } from "react";

let useInput = (callback)  =>  {
  const [inputs, setInputs] = useState({});

  let handleSubmit = (event) => {
    console.log('submit', inputs)
    if (event) {
      event.preventDefault();
    }
    callback();
  }

  let handleChange = (event) => {
    setInputs(inputs => ({...inputs,
      [event.target.name]: event.target.value
    }))
  }
  return {handleSubmit, handleChange, inputs};
}

export default useInput;

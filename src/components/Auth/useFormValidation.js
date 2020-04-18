import React, { useState } from "react";

function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);

  function handleChange(event) {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ values });
  }

  return { handleChange, handleSubmit, values };
}

export default useFormValidation;
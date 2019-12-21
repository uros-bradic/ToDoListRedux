import React, { useState } from "react";
import { TextField } from "./TextField";
export const AddToDoField = function AddToDoField(props, ref) {
  const { onAddToDoButtonClick, ...inputProps } = props;
  const [itemValue, setItemValue] = useState("test");

  const handleTextChange = e => {
    e.preventDefault();
    setItemValue(e.target.value);
  };

  const handleButtonClick = e => {
    e.preventDefault();
    onAddToDoButtonClick(itemValue);
  };

  return (
    <div>
      <TextField
        onChange={handleTextChange}
        value={itemValue}
        {...inputProps}
      />
      <button onClick={handleButtonClick}>Add</button>
    </div>
  );
};

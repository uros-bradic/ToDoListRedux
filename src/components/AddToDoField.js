import React, { useState } from "react";
import { TextField } from "./TextField";
export const AddToDoField = function AddToDoField(props) {
  const { onAddToDoButtonClick, errors, ...inputProps } = props;
  const [itemValue, setItemValue] = useState("");
  const { emptyToDoError, toDoAlreadyExistError } = errors;

  const handleTextChange = e => {
    e.preventDefault();
    setItemValue(e.target.value);
  };

  const handleButtonClick = e => {
    e.preventDefault();
    // if (!itemValue) return;
    onAddToDoButtonClick(itemValue);
    setItemValue("");
  };

  return (
    <form>
      <TextField
        onChange={handleTextChange}
        value={itemValue}
        {...inputProps}
        placeholder="Add to do"
      />
      <button type="submit" onClick={handleButtonClick}>
        Add
      </button>
      <div class="error">{emptyToDoError && emptyToDoError}</div>
      <div class="error">{toDoAlreadyExistError && toDoAlreadyExistError}</div>
    </form>
  );
};

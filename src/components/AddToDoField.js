import React, { useState, useContext } from "react";
import { TextField } from "./TextField";
import { toDoListContext } from "./ToDoListContainer";
export const AddToDoField = function AddToDoField() {
  const { onAddToDoButtonClick, errors } = useContext(toDoListContext);
  const [itemValue, setItemValue] = useState("");
  const { emptyToDoError, toDoAlreadyExistError } = errors;

  const handleTextChange = e => {
    e.preventDefault();
    setItemValue(e.target.value);
  };

  const handleButtonClick = e => {
    e.preventDefault();
    onAddToDoButtonClick(itemValue);
    setItemValue("");
  };

  return (
    <div>
      <form>
        <TextField
          onChange={handleTextChange}
          value={itemValue}
          placeholder="Add to do"
        />
        <button type="submit" onClick={handleButtonClick}>
          Add
        </button>
        <div className="error">{emptyToDoError && emptyToDoError}</div>
        <div className="error">
          {toDoAlreadyExistError && toDoAlreadyExistError}
        </div>
      </form>
    </div>
  );
};

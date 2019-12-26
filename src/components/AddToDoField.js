import React, { useState } from "react";
import { TextField } from "./TextField";
import { connect } from "react-redux";
import { addToDo } from "../store/actions.js";

const mapStateToProps = state => {
  return { errors: state.errors };
};

function mapDispatchToProps(dispatch) {
  return {
    addToDo: item => dispatch(addToDo(item))
  };
}

const AddToDoFieldConnected = function AddToDoField({ errors, addToDo }) {
  const [itemValue, setItemValue] = useState("");
  const { emptyToDoError, toDoAlreadyExistError } = errors;

  const handleTextChange = e => {
    e.preventDefault();
    setItemValue(e.target.value);
  };

  const handleButtonClick = e => {
    e.preventDefault();
    addToDo(itemValue);
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

export const AddToDoField = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToDoFieldConnected);

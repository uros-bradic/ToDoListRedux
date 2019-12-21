import React from "react";
import { CheckBoxField } from "./CheckboxField";

export const ToDoListPanel = function(props) {
  const { toDoListItems, onToDoValueChange, onRemoveToDoButtonClick } = props;
  if (!toDoListItems || toDoListItems.length === 0) return null;

  const handleChecboxChange = e => {
    e.stopPropagation();
    onToDoValueChange(e.target.value);
  };

  const handleRemoveClick = e => {
    onRemoveToDoButtonClick(e.target.value);
  };
  return (
    <ul>
      {toDoListItems.map(item => (
        <li key={item.title}>
          <CheckBoxField
            title={item.title}
            checked={item.checked}
            value={item.title}
            onChange={handleChecboxChange}
          />
          <button onClick={handleRemoveClick} value={item.title}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

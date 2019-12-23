import React from "react";

export const ToDoProgressPanel = function ToDoProgressPanel(props) {
  const { toDoListItems } = props;
  let totalItems = toDoListItems.length;
  let finishedItems = toDoListItems.filter(item => item.checked).length;
  return (
    <div>
      {finishedItems}/{totalItems}
    </div>
  );
};

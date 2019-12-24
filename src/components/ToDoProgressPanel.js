import React, { useContext } from "react";
import { toDoListContext } from "./ToDoListContainer";

export const ToDoProgressPanel = function ToDoProgressPanel() {
  const { itemsList } = useContext(toDoListContext);
  let totalItems = itemsList.length;
  let finishedItems = itemsList.filter(item => item.checked).length;
  return (
    <div>
      {finishedItems}/{totalItems}
    </div>
  );
};

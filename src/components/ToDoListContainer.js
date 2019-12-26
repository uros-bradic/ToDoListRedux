import React from "react";
import { AddToDoField } from "./AddToDoField";
import { ToDoListPanel } from "./ToDoListPanel";
import { ToDoProgressPanel } from "./ToDoProgressPanel";

const defaultContext = {
  itemsList: [],
  errors: {},
  onAddToDoButtonClick: function() {},
  onToDoValueChange: function() {},
  onRemoveToDoButtonClick: function() {},
  onSortEnd: function() {}
};
const toDoListContext = React.createContext(defaultContext);

function arrayMove(arr, fromIndex, toIndex) {
  const newArray = [...arr];
  const element = newArray[fromIndex];
  newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, element);
  return newArray;
}

export default class ToDoListContainer extends React.Component {
  state = {
    itemsList: [],
    errors: {}
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ itemsList }) => ({
      itemsList: arrayMove(itemsList, oldIndex, newIndex)
    }));
  };

  getToDoListContextValue() {
    return {
      onSortEnd: this.handleSortEnd
    };
  }
  render() {
    return (
      <toDoListContext.Provider value={this.getToDoListContextValue()}>
        <h1>To Do List using Redux</h1>
        <AddToDoField />
        <ToDoListPanel />
        <ToDoProgressPanel />
      </toDoListContext.Provider>
    );
  }
}

export { toDoListContext };

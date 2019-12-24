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

function isEmptyString(value) {
  return value.trim() === "";
}

function isNil(value) {
  return value == null;
}

function hasAnyError(errors) {
  if (isNil(errors)) {
    return false;
  }
  return Object.keys(errors).some(key => {
    const value = errors[key];

    if (value && typeof value === "object") {
      return hasAnyError(value);
    }

    // check if value is not falsy
    // return typeof value !== 'undefined'
    return !!value;
  });
}

function isExistingItem(item, list) {
  return list.filter(listItem => listItem.title === item.title).length > 0;
}

const toDoListItems = [
  {
    title: "first to do",
    checked: false
  },
  {
    title: "second to do",
    checked: true
  }
];

export default class ToDoListContainer extends React.Component {
  state = {
    itemsList: toDoListItems,
    errors: {}
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ itemsList }) => ({
      itemsList: arrayMove(itemsList, oldIndex, newIndex)
    }));
  };

  handleErrors = errors => {
    this.setState({ errors: errors });
  };

  validateForm = value => {
    const emptyToDoError = isEmptyString(value.title)
      ? "Please enter to do title"
      : null;
    const toDoAlreadyExistError = isExistingItem(value, this.state.itemsList)
      ? "To do item already exists"
      : null;
    return {
      emptyToDoError,
      toDoAlreadyExistError
    };
  };

  handleAddToDoButtonClick = item => {
    const newListItem = {
      title: item,
      checked: false
    };

    const errors = this.validateForm(newListItem);
    this.handleErrors(errors);
    if (hasAnyError(errors)) return;
    this.setState(state => {
      const itemsNewList = this.state.itemsList.concat(newListItem);
      return {
        itemsList: itemsNewList
      };
    });
  };

  handleToDoValueChange = title => {
    this.setState(state => {
      const itemsNewList = this.state.itemsList.map(item => {
        const newItem = {
          title: item.title,
          checked: !item.checked
        };
        if (title === item.title) {
          return newItem;
        } else {
          return item;
        }
      });
      return {
        itemsList: itemsNewList
      };
    });
  };

  handleRemoveToDoButtonClick = title => {
    this.setState(state => {
      const itemsNewList = this.state.itemsList.filter(
        item => item.title !== title
      );
      return {
        itemsList: itemsNewList
      };
    });
  };

  getToDoListContextValue() {
    return {
      itemsList: this.state.itemsList,
      errors: this.state.errors,
      onAddToDoButtonClick: this.handleAddToDoButtonClick,
      onToDoValueChange: this.handleToDoValueChange,
      onRemoveToDoButtonClick: this.handleRemoveToDoButtonClick,
      onSortEnd: this.handleSortEnd
    };
  }
  render() {
    return (
      <toDoListContext.Provider value={this.getToDoListContextValue()}>
        <h1>To Do List using context</h1>
        <AddToDoField />
        <ToDoListPanel />
        <ToDoProgressPanel />
      </toDoListContext.Provider>
    );
  }
}

export { toDoListContext };

import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODO_VALUE,
  SORT_TODO_ITEMS
} from "./action-types";

function addToDo(payload) {
  return { type: ADD_TODO, payload };
}

function removeToDo(payload) {
  return { type: REMOVE_TODO, payload };
}

function setToDoValue(payload) {
  return { type: SET_TODO_VALUE, payload };
}

function sortToDoItems(payload) {
  return { type: SORT_TODO_ITEMS, payload };
}

export { addToDo, removeToDo, sortToDoItems, setToDoValue };

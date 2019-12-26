import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_ERRORS,
  SET_TODO_VALUE
} from "./action-types";

function addToDo(payload) {
  return { type: ADD_TODO, payload };
}

function removeToDo(payload) {
  return { type: REMOVE_TODO, payload };
}

function handleErrors(payload) {
  return { type: UPDATE_ERRORS, payload };
}

function setToDoValue(payload) {
  return { type: SET_TODO_VALUE, payload };
}

export { addToDo, removeToDo, handleErrors, setToDoValue };

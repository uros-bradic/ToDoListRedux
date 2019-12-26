import { ADD_TODO, REMOVE_TODO, SET_TODO_VALUE } from "./action-types";
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

const initialState = {
  itemsList: toDoListItems,
  errors: {}
};

function isEmptyString(value) {
  return value.trim() === "";
}

function isExistingItem(value, list) {
  return list.filter(listItem => listItem.title === value).length > 0;
}

function validateForm(value, list) {
  const emptyToDoError = isEmptyString(value)
    ? "Please enter to do title"
    : null;
  const toDoAlreadyExistError = isExistingItem(value, list)
    ? "To do item already exists"
    : null;
  return {
    emptyToDoError,
    toDoAlreadyExistError
  };
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
function rootReducer(state = initialState, action) {
  if (action.type === ADD_TODO) {
    const errors = validateForm(action.payload, state.itemsList);
    if (hasAnyError(errors)) {
      return {
        itemsList: state.itemsList,
        errors
      };
    }
    const itemsList = state.itemsList.concat({
      title: action.payload,
      checked: false
    });
    return {
      itemsList,
      errors
    };
  }
  if (action.type === REMOVE_TODO) {
    const itemsList = state.itemsList.filter(
      item => item.title !== action.payload
    );
    const errors = state.errors;
    return {
      itemsList,
      errors
    };
  }
  if (action.type === SET_TODO_VALUE) {
    const itemsList = state.itemsList.map(item => {
      const newItem = {
        title: item.title,
        checked: !item.checked
      };
      if (action.payload === item.title) {
        return newItem;
      } else {
        return item;
      }
    });
    const errors = state.errors;
    return {
      itemsList,
      errors
    };
  }
  return state;
}

export default rootReducer;

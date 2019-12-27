import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODO_VALUE,
  SORT_TODO_ITEMS
} from "./action-types";
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
    return !!value;
  });
}

function arrayMove(arr, fromIndex, toIndex) {
  const newArray = [...arr];
  const element = newArray[fromIndex];
  newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, element);
  return newArray;
}

function handleSortEnd(payload, state) {
  const { oldIndex, newIndex } = payload;
  const itemsList = arrayMove(state.itemsList, oldIndex, newIndex);
  return {
    ...state,
    itemsList
  };
}

function handleAddToDo(payload, stateItemsList) {
  const errors = validateForm(payload, stateItemsList);
  if (hasAnyError(errors)) {
    return {
      itemsList: stateItemsList,
      errors
    };
  }
  const itemsList = stateItemsList.concat({
    title: payload,
    checked: false
  });
  return {
    itemsList,
    errors
  };
}

function handleRemoveToDo(payload, state) {
  const itemsList = state.itemsList.filter(item => item.title !== payload);
  return {
    ...state,
    itemsList
  };
}

function handleSetToDoValue(payload, state) {
  const itemsList = state.itemsList.map(item => {
    const newItem = {
      title: item.title,
      checked: !item.checked
    };
    if (payload === item.title) {
      return newItem;
    } else {
      return item;
    }
  });
  return {
    ...state,
    itemsList
  };
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return handleAddToDo(action.payload, state.itemsList);
    case REMOVE_TODO:
      return handleRemoveToDo(action.payload, state);
    case SET_TODO_VALUE:
      return handleSetToDoValue(action.payload, state);
    case SORT_TODO_ITEMS:
      return handleSortEnd(action.payload, state);
    default:
      return state;
  }
}

export default rootReducer;

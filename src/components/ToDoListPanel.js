import React from "react";
import { CheckBoxField } from "./CheckboxField";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { removeToDo, setToDoValue, sortToDoItems } from "../store/actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { itemsList: state.itemsList };
};

function mapDispatchToProps(dispatch) {
  return {
    removeToDo: item => dispatch(removeToDo(item)),
    setToDoValue: item => dispatch(setToDoValue(item)),
    sortToDoItems: item => dispatch(sortToDoItems(item))
  };
}

const ToDoListPanelConnected = function({
  itemsList,
  removeToDo,
  setToDoValue,
  sortToDoItems
}) {
  if (!itemsList || itemsList.length === 0) return null;

  const handleCheckboxChange = e => {
    e.preventDefault();
    e.stopPropagation();
    setToDoValue(e.target.value);
  };

  const handleRemoveClick = e => {
    removeToDo(e.target.value);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    sortToDoItems({ oldIndex, newIndex });
  };

  const SortableItem = sortableElement(({ item }) => (
    <li>
      <CheckBoxField
        title={item.title}
        checked={item.checked}
        value={item.title}
        onChange={handleCheckboxChange}
      />
      <button onClick={handleRemoveClick} value={item.title}>
        Remove
      </button>
    </li>
  ));

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
  });

  return (
    <SortableContainer onSortEnd={onSortEnd}>
      {itemsList.map((item, index) => (
        <SortableItem item={item} index={index} key={item.title} />
      ))}
    </SortableContainer>
  );
};

export const ToDoListPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoListPanelConnected);

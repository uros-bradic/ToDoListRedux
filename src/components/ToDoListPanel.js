import React from "react";
import { CheckBoxField } from "./CheckboxField";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

export const ToDoListPanel = function(props) {
  const {
    toDoListItems,
    onToDoValueChange,
    onRemoveToDoButtonClick,
    onSortEnd
  } = props;
  if (!toDoListItems || toDoListItems.length === 0) return null;

  const handleCheckboxChange = e => {
    e.stopPropagation();
    onToDoValueChange(e.target.value);
  };

  const handleRemoveClick = e => {
    onRemoveToDoButtonClick(e.target.value);
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
      {toDoListItems.map((item, index) => (
        <SortableItem item={item} index={index} key={item.title} />
      ))}
    </SortableContainer>
  );
};

import React, { useContext } from "react";
import { CheckBoxField } from "./CheckboxField";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { toDoListContext } from "./ToDoListContainer";

export const ToDoListPanel = function() {
  const {
    itemsList,
    onToDoValueChange,
    onRemoveToDoButtonClick,
    onSortEnd
  } = useContext(toDoListContext);

  if (!itemsList || itemsList.length === 0) return null;

  const handleCheckboxChange = e => {
    e.preventDefault();
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
      {itemsList.map((item, index) => (
        <SortableItem item={item} index={index} key={item.title} />
      ))}
    </SortableContainer>
  );
};

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    itemsList: state.itemsList
  };
};
const ToDoProgressPanelConnected = function ToDoProgressPanel({ itemsList }) {
  let totalItems = itemsList.length;
  let finishedItems = itemsList.filter(item => item.checked).length;
  return (
    <div>
      {finishedItems}/{totalItems}
    </div>
  );
};

export const ToDoProgressPanel = connect(mapStateToProps)(
  ToDoProgressPanelConnected
);

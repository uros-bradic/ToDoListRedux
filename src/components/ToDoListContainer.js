import React from "react";
import { TextField } from "./TextField";

export default class ToDoListContainer extends React.Component {
  static propTypes = {};

  state = {
    listItems: [],
    errors: {}
  };

  render() {
    return (
      <React.Fragment>
        <div>This is container</div>
        <TextField />
      </React.Fragment>
    );
  }
}

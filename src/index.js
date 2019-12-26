import React from "react";
import ReactDOM from "react-dom";
import ToDoListContainer from "./components/ToDoListContainer";
import "./styles.css";

import store from "./store/store.js";
import { addToDo, removeToDo } from "./store/actions.js";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <ToDoListContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

window.store = store;
window.addToDo = addToDo;
window.removeToDo = removeToDo;

import React from "react";
import ReactDOM from "react-dom";
import ToDoListContainer from "./components/ToDoListContainer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <ToDoListContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

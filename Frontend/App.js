import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <Register />
      <Login />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
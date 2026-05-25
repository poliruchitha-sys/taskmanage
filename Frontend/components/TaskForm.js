import React, { useState } from "react";
import { taskAPI } from "../api";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await taskAPI.createTask({ title });
      setTitle("");
      alert("Task Added");
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />

      <button onClick={addTask} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}

export default TaskForm;
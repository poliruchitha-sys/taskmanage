import React, { useEffect, useState } from "react";
import { taskAPI } from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await taskAPI.getTasks();
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>

      {error && <p style={{color: 'red'}}>{error}</p>}
      {loading && <p>Loading...</p>}

      {tasks.length === 0 && !loading && <p>No tasks yet</p>}

      {tasks.map((task) => (
        <div key={task._id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
          <p>{task.title}</p>
          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
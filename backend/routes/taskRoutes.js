const express = require("express");

const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      user: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title || task.title;
    task.completed = req.body.completed;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
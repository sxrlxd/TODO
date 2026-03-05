const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { task, task_detail, end_date, task_status } = req.body;

    const newTask = new Task({
      task,
      task_detail,
      end_date,
      task_status,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 1️⃣ List All Tasks (with filters)
exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status) {
      filter.task_status = status;
    }

    const tasks = await Task.find(filter).sort({ end_date: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

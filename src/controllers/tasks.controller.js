const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.payload.id,
  }).populate("user");
  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    const foundTask = await Task.findById(id).populate("user");
    if (!foundTask) {
      res.status(404).json({ message: "task not found" });
    } else {
      res.status(200).json({ message: "succesfully task found", foundTask });
    }
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newTask = new Task({
      title: title,
      description: description,
      date: date,
      user: req.payload.id,
    });
    const savedTask = await newTask.save();
    res.status(201).json({ message: "task successfully created", savedTask });
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(id).populate("user");
    if (!deletedTask) {
      res.status(404).json({ message: "task not found" });
    } else {
      res.status(204).json({ message: "succesfully task found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");
    if (!updatedTask) {
      res.status(404).json({ message: "task not found" });
    } else {
      res.status(200).json({ message: "succesfully task found", updatedTask });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };

// controllers/taskController.js
const Task = require('../models/taskModel');

// GET all tasks (Read)
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new task (Create)
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// You will also need updateTask (PUT) and deleteTask (DELETE) here...

module.exports = { getTasks, createTask };
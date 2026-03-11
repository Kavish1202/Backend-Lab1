// controllers/taskWebController.js
const Task = require('../models/taskModel');

// @desc    Show all tasks in an HTML table
// @route   GET /tasks
const getAllTasksWeb = async (req, res) => {
    try {
        const tasks = await Task.find();
        // Render the index.ejs page and pass the tasks data to it
        res.render('tasks/index', { tasks: tasks });
    } catch (error) {
        req.flash('error_msg', 'Failed to load tasks.');
        res.redirect('/');
    }
};

// @desc    Show a single task by ID
// @route   GET /tasks/:id
const getSingleTaskWeb = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            req.flash('error_msg', 'Task not found.');
            return res.redirect('/tasks');
        }
        res.render('tasks/show', { task: task });
    } catch (error) {
        req.flash('error_msg', 'Invalid Task ID.');
        res.redirect('/tasks');
    }
};

module.exports = { getAllTasksWeb, getSingleTaskWeb };
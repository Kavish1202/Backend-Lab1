// controllers/taskWebController.js
const Task = require('../models/taskModel');

const getAllTasksWeb = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('tasks/index', { tasks: tasks });
    } catch (error) {
        req.flash('error_msg', 'Failed to load tasks.');
        res.redirect('/');
    }
};

const getSingleTaskWeb = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render('tasks/show', { task: task });
    } catch (error) {
        req.flash('error_msg', 'Invalid Task ID.');
        res.redirect('/tasks');
    }
};

// --- NEW CRUD WEB FUNCTIONS ADDED BELOW ---

// 1. Show the "Create Task" form
const renderCreateForm = (req, res) => {
    res.render('tasks/new');
};

// 2. Handle the Create form submission
const createTaskWeb = async (req, res) => {
    try {
        // HTML checkboxes send 'on' if checked, otherwise they send nothing
        const isCompleted = req.body.completed === 'on'; 
        
        await Task.create({
            title: req.body.title,
            description: req.body.description,
            completed: isCompleted
        });
        
        req.flash('success_msg', 'Task successfully created!'); // FLASH MESSAGE
        res.redirect('/tasks'); // Send them back to the table
    } catch (error) {
        req.flash('error_msg', 'Error creating task.');
        res.redirect('/tasks/new');
    }
};

// 3. Show the "Edit Task" form
const renderEditForm = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render('tasks/edit', { task: task });
    } catch (error) {
        req.flash('error_msg', 'Task not found.');
        res.redirect('/tasks');
    }
};

// 4. Handle the Edit form submission
const updateTaskWeb = async (req, res) => {
    try {
        const isCompleted = req.body.completed === 'on';
        
        await Task.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            completed: isCompleted
        });
        
        req.flash('success_msg', 'Task successfully updated!'); // FLASH MESSAGE
        res.redirect('/tasks');
    } catch (error) {
        req.flash('error_msg', 'Error updating task.');
        res.redirect('/tasks');
    }
};

// 5. Handle the Delete action
const deleteTaskWeb = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Task successfully deleted!'); // FLASH MESSAGE
        res.redirect('/tasks');
    } catch (error) {
        req.flash('error_msg', 'Error deleting task.');
        res.redirect('/tasks');
    }
};

module.exports = { 
    getAllTasksWeb, getSingleTaskWeb, 
    renderCreateForm, createTaskWeb, 
    renderEditForm, updateTaskWeb, deleteTaskWeb 
};
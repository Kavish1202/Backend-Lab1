// routes/taskRoutes.js
const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Route for /api/tasks
router.route('/')
    .get(getTasks)
    .post(createTask);

// Route for /api/tasks/:id
router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;
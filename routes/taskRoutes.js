// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');

router.route('/')
    .get(getTasks)
    .post(createTask);

// You would add router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
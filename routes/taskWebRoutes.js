// routes/taskWebRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTasksWeb, getSingleTaskWeb } = require('../controllers/taskWebController');

// GET /tasks (Shows the table)
router.get('/', getAllTasksWeb);

// GET /tasks/:id (Shows one task)
router.get('/:id', getSingleTaskWeb);

module.exports = router;
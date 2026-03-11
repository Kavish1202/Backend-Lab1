// routes/taskWebRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAllTasksWeb, getSingleTaskWeb, 
    renderCreateForm, createTaskWeb, 
    renderEditForm, updateTaskWeb, deleteTaskWeb 
} = require('../controllers/taskWebController');

// READ (All tasks)
router.get('/', getAllTasksWeb);

// CREATE (Show form, then submit form)
router.get('/new', renderCreateForm); // <-- Must be above /:id
router.post('/', createTaskWeb);

// UPDATE (Show form, then submit form)
router.get('/edit/:id', renderEditForm);
router.post('/edit/:id', updateTaskWeb);

// DELETE
router.post('/delete/:id', deleteTaskWeb);

// READ (Single task)
router.get('/:id', getSingleTaskWeb);

module.exports = router;
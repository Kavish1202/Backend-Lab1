// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// This creates the POST /api/auth/login route
router.post('/login', login);

module.exports = router;
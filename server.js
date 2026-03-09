require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const taskRoutes = require('./routes/taskRoutes');

const authRoutes = require('./routes/authRoutes');
const { verifyAPIKey, verifyJWT } = require('./middleware/authMiddleware');

const app = express();

app.use(helmet()); 
app.disable('x-powered-by');

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/protected', verifyAPIKey, (req, res) => {
    res.status(200).json({ message: 'Success! You have entered the VIP area.' });
});

app.get('/api/jwt-protected', verifyJWT, (req, res) => {
    res.status(200).json({ 
        message: 'Success! You accessed the JWT protected route.',
        user: req.user
    });
});

const dbURI = process.env.MONGO_URI; 

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });
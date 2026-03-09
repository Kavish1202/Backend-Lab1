require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

// IMPORT YOUR ROUTES HERE
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);

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
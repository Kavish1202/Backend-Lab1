require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); 
const session = require('express-session');
const flash = require('connect-flash');

const taskRoutes = require('./routes/taskRoutes');

const authRoutes = require('./routes/authRoutes');
const { verifyAPIKey, verifyJWT } = require('./middleware/authMiddleware');

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'my-super-secret-session-key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(helmet()); 
app.disable('x-powered-by');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- LAB 3 LANDING PAGE ROUTE ---
app.get('/', (req, res) => {
    // This tells Express to look for a file named 'index.ejs' in a 'views' folder
    res.render('index'); 
});

// ... right under your app.get('/') route ...

// --- THE FRIDAY TESTER ROUTE ---
app.get('/friday', (req, res) => {
    // 1. Check for the "cheat code" in the URL (e.g., ?date=2026-02-27)
    let targetDate;
    if (req.query.date) {
        // If they provided a date, use that one
        targetDate = new Date(req.query.date);
    } else {
        // Otherwise, use today's actual date
        targetDate = new Date();
    }

    // 2. Figure out the day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[targetDate.getDay()]; // getDay() returns a number from 0-6

    // 3. Is it Friday? (Friday is index 5)
    const isFriday = targetDate.getDay() === 5;

    // 4. Send this data to the EJS template
    res.render('friday', { 
        currentDate: targetDate.toDateString(), 
        dayName: dayName, 
        isFriday: isFriday 
    });
});

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
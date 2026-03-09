// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. The Hardcoded User (Requirement: username "doe", password "doe")
const hardcodedUsername = "doe";
// We use bcrypt to hash the password "doe" so it's secure in our code
const hardcodedPasswordHash = bcrypt.hashSync("doe", 10); 

const login = async (req, res) => {
    // Grab the username and password the user sends in their request
    const { username, password } = req.body;

    // 2. Check if username matches
    if (username !== hardcodedUsername) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    // 3. Compare the typed password with our bcrypt hash
    const isMatch = await bcrypt.compare(password, hardcodedPasswordHash);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // 4. If everything is correct, generate the JWT!
    const token = jwt.sign(
        { username: hardcodedUsername }, // The data we want to store in the token
        process.env.JWT_SECRET,          // Our secret signature from .env
        { expiresIn: '1h' }              // Make the token expire in 1 hour
    );

    // Send the token back to the user
    res.status(200).json({ 
        message: 'Login successful', 
        token: token 
    });
};

module.exports = { login };
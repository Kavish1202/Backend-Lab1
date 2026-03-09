const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hardcodedUsername = "doe";
const hardcodedPasswordHash = bcrypt.hashSync("doe", 10); 

const login = async (req, res) => {
    const { username, password } = req.body;

    if (username !== hardcodedUsername) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    const isMatch = await bcrypt.compare(password, hardcodedPasswordHash);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { username: hardcodedUsername },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ 
        message: 'Login successful', 
        token: token 
    });
};

module.exports = { login };
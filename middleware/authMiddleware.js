// middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // ADDED: We need this to verify the token

const verifyAPIKey = (req, res, next) => {
    const apiKey = req.query.api_key || req.header('x-api-key');
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Access Denied: Invalid or missing API Key' });
    }
    next(); 
};

// ADDED: The new JWT bouncer
const verifyJWT = (req, res, next) => {
    // Tokens are sent in the 'Authorization' header
    const authHeader = req.header('Authorization');
    
    // Check if the header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    // Split "Bearer <token>" and grab just the <token> part
    const token = authHeader.split(' ')[1]; 

    try {
        // Verify the token using our secret key from .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the decoded user info to the request
        next(); // Let them pass!
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Update the export to include BOTH functions
module.exports = { verifyAPIKey, verifyJWT };
const jwt = require('jsonwebtoken');

const verifyAPIKey = (req, res, next) => {
    const apiKey = req.query.api_key || req.header('x-api-key');
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Access Denied: Invalid or missing API Key' });
    }
    next(); 
};

const verifyJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = { verifyAPIKey, verifyJWT };
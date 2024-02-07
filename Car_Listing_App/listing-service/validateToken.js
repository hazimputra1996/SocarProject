const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    // Extract token from Authorization header
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ error: 'Authorization header is missing or invalid.' });
    }

    // Validate token
    jwt.verify(token, 'cats', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        // Check if token has required scopes
        // Adjust this according to your application's actual scopes
        if (!decoded.scopes || !decoded.scopes.includes('read:resource')) {
            return res.status(403).json({ error: 'Insufficient scope.' });
        }

        // Token is valid and has required scopes
        req.user = decoded; // Attach decoded user information to request object
        next(); // Call next middleware/route handler
    });
}

module.exports = validateToken;
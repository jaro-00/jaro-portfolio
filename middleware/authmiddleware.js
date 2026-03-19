const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Express middleware that enforces Bearer-token authentication.
 *
 * - Expects `Authorization: Bearer <jwt>` header
 * - On success, attaches the decoded JWT payload to `req.user`
 * - On failure, returns a 401/403 JSON error response
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.status(401).json({ error: "Access denied, no token provided" });
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    })
}

module.exports = { authToken };
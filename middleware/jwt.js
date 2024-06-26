import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, config.token, {
        expiresIn: '1h',
    });

    return accessToken;
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader && authHeader.split(' ')[1];

    if (!jwtToken) return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(jwtToken, config.token);
    req.authenticatedUser = payload;
    next();
};

export { generateToken, verifyToken };

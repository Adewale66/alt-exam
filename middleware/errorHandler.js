import { isHttpError } from 'http-errors';
import { logger } from '../utils/config.js';

const errorHandler = (error, req, res, next) => {
    logger.error(error);
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Invalid Email' });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: 'invalid token' });
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' });
    } else if (error.name == 'MongoServerError') {
        return res.status(400).json({ error: 'Resource already exists' });
    } else if (error.name == 'ResourceNotFoundError') {
        return res.status(error.code).json({ error: error.message });
    } else if (error.name == 'EmptyFieldError') {
        return res.status(error.code).json({ error: error.message });
    } else if (error.name == 'UnAuthorizedRequestError') {
        return res.status(error.code).json({ error: error.message });
    } else if (isHttpError(error)) {
        return res.status(error.status).json({ error: error.message });
    }
};

export default errorHandler;

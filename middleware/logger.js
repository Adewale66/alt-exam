import morgan from 'morgan';
import { logger } from '../utils/config.js';

const loggerMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message) => logger.info(message.trim()),
        },
    }
);

export default loggerMiddleware;

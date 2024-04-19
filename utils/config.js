import 'dotenv/config';
import winston from 'winston';
import mongoose from 'mongoose';


const { combine, timestamp, printf, colorize, align, errors } = winston.format;

const loggerConfig = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize({ all: true }),
        errors({ stack: true }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()],
});

const logger = {
    info: (...params) => {
        if (process.env.NODE_ENV != 'test') {
            loggerConfig.info(params);
        }
    },
    http: (...params) => {
        if (process.env.NODE_ENV != 'test') {
            loggerConfig.http(params);
        }
    },
    error: (...params) => {
        if (process.env.NODE_ENV != 'test') {
            loggerConfig.error(params);
        }
    },
};

const config = {
    PORT: process.env.PORT,
    env: process.env.NODE_ENV,
    token: process.env.TOKEN_SECRET,
    disconnectDB: async () => {
        await mongoose.connection.close();
    },
    connectDB: async () => {
        try {
            let MONGO_URI = process.env.MONGO_URI_PROD;
            if (process.env.NODE_ENV == 'dev') {
                MONGO_URI = process.env.MONGO_URI_DEV;
            } else if (process.env.NODE_ENV == 'test') {
                MONGO_URI = process.env.MONGO_URI_TEST;
            }
            mongoose.connect(MONGO_URI).then(() => {
                logger.info('Mongo db connected!');
            });
        } catch (error) {
            logger.error('Failed mongo db connection');
        }
    },
};


export { config, logger };

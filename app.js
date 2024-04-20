import express from 'express';
import blogRouter from './routes/blog.route.js';
import userRouter from './routes/user.route.js';
import errorHandler from './middleware/errorHandler.js';
import loggerMiddleware from './middleware/logger.js';
import createHttpError from 'http-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJson from './swagger-output.json' assert { type: 'json' };

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(loggerMiddleware);

app.use(
    '/api-docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerJson)
);
app.get("/", (req, res) => res.redirect("/api-docs"));
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/v1', userRouter);
app.use('/api/v1', blogRouter);

app.use((req, res, next) =>
    next(createHttpError(404, `${req.url} endpoint not found`))
);
app.use(errorHandler);

export default app;

import { createUser, loginUser } from '../controllers/user.controller.js';
import express from 'express';
import asyncHandler from 'express-async-handler';

const userRouter = express.Router();

/**
 * @openapi
 * '/api/v1/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a user
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadUserResponse'
 */
userRouter.post('/register', asyncHandler(createUser));

/**
 * @openapi
 * '/api/v1/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Log a user
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoggedUserResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadUserResponse'
 */
userRouter.post('/login', asyncHandler(loginUser));

export default userRouter;

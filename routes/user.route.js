import { createUser, loginUser } from '../controllers/user.controller.js';
import express from 'express';
import asyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.post('/register', asyncHandler(createUser));
userRouter.post('/login', asyncHandler(loginUser));

export default userRouter;

import express from 'express';
import asyncHandler from 'express-async-handler';
import {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlog,
    getLoggedinUserBlogs,
    updateBlog,
} from '../controllers/blog.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const blogRouter = express.Router();

blogRouter.get('/blogs/:id', asyncHandler(getBlog));
blogRouter.get('/blogs', asyncHandler(getAllBlogs));

blogRouter.use(verifyToken);

blogRouter.get('/me', asyncHandler(getLoggedinUserBlogs));
blogRouter.post('/blogs', asyncHandler(createBlog));
blogRouter.patch('/blogs/:id', asyncHandler(updateBlog));
blogRouter.delete('/blogs/:id', asyncHandler(deleteBlog));

export default blogRouter;

import {
    EmptyFieldError,
    ResourceNotFoundError,
    UnAuthorizedRequestError,
} from '../errors/user.error.js';
import blogModel from '../models/blog.model.js';
import readingTime, {
    orderByReadCount,
    orderByReadTime,
    orderByTimeStamp,
} from '../utils/util.js';

const getAllBlogs = async (req, res) => {
    const { author, title, tags, order_by, page } = req.query;

    const pageOffset = page ? (page - 1) * 20 : 0;
    const allBlogs = await blogModel
        .find({ state: 'published' })
        .populate('author', 'firstName lastName')
        .exec();
    const blogs = allBlogs.filter((blog) => {
        if (author && blog.author.firstName != author) return false;
        if (title && blog.title != title) return false;
        if (tags) {
            let count = 0;
            tags.split(',').forEach((tag) => {
                if (blog.tags.includes(tag)) count++;
            });
            if (count == 0) return false;
        }
        return true;
    });

    if (order_by == 'reading_time') {
        blogs.sort(orderByReadTime);
    } else if (order_by == 'timestamp') {
        blogs.sort(orderByTimeStamp);
    } else if (order_by == 'read_count') {
        blogs.sort(orderByReadCount);
    }

    return res.status(200).json(blogs.slice(pageOffset, pageOffset + 20));
};

const getBlog = async (req, res) => {
    const id = req.params.id;

    const blog = await blogModel
        .findOne({ _id: id, state: 'published' })
        .populate('author', 'firstName lastName')
        .exec();
    if (!blog) throw new ResourceNotFoundError('Blog Not found', 404);
    blog.read_count++;
    await blog.save();
    return res.status(200).json(blog);
};

const createBlog = async (req, res) => {
    const user = req.authenticatedUser;
    const { title, desciption, tags, body } = req.body;
    if (!title) throw new EmptyFieldError('Title is required', 400);
    if (!body) throw new EmptyFieldError('Body is required', 400);

    const reading_time = readingTime(body);

    const blog = await new blogModel({
        title,
        body,
        tags: tags ? tags.split(',') : [],
        desciption: desciption | '',
        author: user.id,
        reading_time,
    });
    await blog.save();
    return res.status(201).json(blog);
};

const deleteBlog = async (req, res) => {
    const id = req.params.id;

    const blog = await blogModel
        .findById(id)
        .populate('author', 'firstName lastName')
        .exec();
    if (!blog) throw new ResourceNotFoundError('Blog Not found', 404);
    if (blog.author._id.toString() != req.authenticatedUser.id)
        throw new UnAuthorizedRequestError('Unathorized request', 401);
    await blogModel.findByIdAndDelete(blog.id);
    return res.status(200).json({ message: 'Blog deleted' });
};

const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { state, body } = req.body;

    if (state && state != 'published' && state != 'draft')
        throw new EmptyFieldError('Invalid state', 400);

    const blog = await blogModel
        .findById(id)
        .populate('author', 'firstName lastName')
        .exec();

    if (!blog) throw new ResourceNotFoundError('Blog Not found', 404);
    if (blog.author._id.toString() != req.authenticatedUser.id)
        throw new UnAuthorizedRequestError('Unathorized request', 401);

    blog.body = body || blog.body;
    blog.state = state || blog.state;
    blog.timestamp =
        body.state == 'published' ? new Date().toLocaleTimeString() : '';
    blog.reading_time = readingTime(blog.body);
    await blog.save();
    return res.status(200).json(blog);
};

const getLoggedinUserBlogs = async (req, res) => {
    const { state, page } = req.query;

    let blogs;
    const pageOffset = page ? (page - 1) * 20 : 0;

    if (state) {
        blogs = await blogModel.find({ state }).populate('author', 'id').exec();
    } else {
        blogs = await blogModel.find({}).populate('author', 'id').exec();
    }
    const loggedUserBlogs = blogs.filter(
        (blog) => blog.author.id == req.authenticatedUser.id
    );
    return res
        .status(200)
        .json(loggedUserBlogs.slice(pageOffset, pageOffset + 20));
};

export {
    getAllBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    getLoggedinUserBlogs,
};

import request from 'supertest';
import { config } from '../utils/config.js';
import { createUser, createBlog, mockServer } from '../utils/testhelper.js';
import blogModel from '../models/blog.model.js';
import userModel from '../models/user.model.js';
import { generateToken } from '../middleware/jwt.js';

const globalBlog = createBlog();
const globalUser = createUser();
let token = '';
const ROUTE = '/api/v1';

beforeAll(async () => {
    config.connectDB();
    const user = await new userModel(globalUser);
    await user.save();
    token = generateToken({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
    });
}, 20000);

describe('Create blog', () => {
    const app = request(mockServer);

    it('Returns 201 on successful blog create', async () => {
        const res = await app
            .post(`${ROUTE}/blogs`)
            .set('Authorization', `Bearer ${token}`)
            .send(globalBlog);
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(globalBlog.title);
    });

    it('Returns 401 on empty credentials passed', async () => {
        const res = await app.post(`${ROUTE}/blogs`);
        expect(res.statusCode).toBe(401);
    });

    it('Returns 400 on only title passed', async () => {
        const res = await app
            .post(`${ROUTE}/blogs`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: globalBlog.title,
            });
        expect(res.statusCode).toBe(400);
    });

    it('Returns 400 on only content passed', async () => {
        const res = await app
            .post(`${ROUTE}/blogs`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                body: globalBlog.body,
            });
        expect(res.statusCode).toBe(400);
    });
});

describe('GET blog(S)', () => {
    const app = request(mockServer);

    it('Returns 200 on successful get all blogs', async () => {
        const res = await app.get(`${ROUTE}/blogs`);
        expect(res.statusCode).toBe(200);
    });

    it('Returns 404 on blog not found', async () => {
        const res = await app.get(`${ROUTE}/blogs/60f4b5a8e3b0f1e8c4e4d7f7`);
        expect(res.statusCode).toBe(404);
    });
});

afterAll(async () => {
    await userModel.deleteMany();
    config.disconnectDB();
    mockServer.close();
}, 20000);

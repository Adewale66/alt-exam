import request from 'supertest';
import { config } from '../utils/config.js';
import { createUser, createBlog, mockServer } from '../utils/testhelper.js';
import blogModel from '../models/blog.model.js';
import userModel from '../models/user.model.js';

let token;
const globalBlog = createBlog();
const globalUser = createUser();
const ROUTE = '/api/v1';

beforeAll(async () => {
    config.connectDB();
    await new userModel(globalUser).save();
}, 20000);

describe('Create blog', () => {
    const app = request(mockServer);
    // const user = createUser();

    it('Returns 401 on non-authenticated blog create', async () => {
        const res = await app.post(`${ROUTE}/blogs`);
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Unauthorized');
    });
});

describe('GET blog(S)', () => {});

afterAll(async () => {
    await userModel.deleteMany();
    config.disconnectDB();
    mockServer.close();
}, 20000);

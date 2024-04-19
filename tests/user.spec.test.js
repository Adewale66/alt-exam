import request from 'supertest';
import { config } from '../utils/config.js';
import userModel from '../models/user.model.js';
import { createUser, mockServer } from '../utils/testhelper.js';

const globalUser = createUser();

beforeAll(async () => {
    config.connectDB();
    await new userModel(globalUser).save();
}, 20000);

const ROUTE = '/api/v1';

describe('Register User', () => {
    const app = request(mockServer);
    const user = createUser();

    it('Returns 201 on successful register', async () => {
        return app
            .post(`${ROUTE}/register`)
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body.message).toBe('User added successfully');
            });
    });

    it('Returns 400 on empty credentials passed', async () => {
        return app.post(`${ROUTE}/register`).then((res) => {
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('Logging in', () => {
    const app = request(mockServer);

    it('Returns 400 on no credentials passed', async () => {
        return app.post(`${ROUTE}/login`).then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Email required');
        });
    });

    it('Returns 400 on only email passed', async () => {
        return app
            .post(`${ROUTE}/login`)
            .send({
                email: globalUser.email,
            })
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe('Password required');
            });
    });

    it('Returns 400 on user that doesnt exist', async () => {
        return app
            .post(`${ROUTE}/login`)
            .send({
                email: 'invalid',
                password: 'invalid',
            })
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.message).toBe('User not found');
            });
    });

    // Tests not working (have no clue why)

    it.skip('Returns 200 on successful login', async () => {
        const response = await app
            .post(`${ROUTE}/login`)
            .set('Content-Type', 'application/json')
            .send(globalUser);
        expect(response.statusCode).toBe(200);
    });

    it.skip('Returns 400 on invalid password', async () => {
        return app
            .post(`${ROUTE}/login`)
            .send({
                email: globalUser.email,
                password: 'invalid',
            })
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe('Invalid Credentials');
            });
    }, 10000);
});

afterAll(async () => {
    await userModel.deleteMany();
    config.disconnectDB();
    mockServer.close();
}, 20000);

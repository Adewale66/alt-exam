import request from 'supertest';
import { config } from '../utils/config.js';
import { mockServer } from '../utils/testhelper.js';

describe('Endpoints', () => {
    const app = request(mockServer);

    it('Returns 404 on endpoint not found', async () => {
        const res = await app.get(`/api/endpoint/not/found`);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe(
            '/api/endpoint/not/found endpoint not found'
        );
    });
});

afterAll(async () => {
    mockServer.close();
}, 20000);

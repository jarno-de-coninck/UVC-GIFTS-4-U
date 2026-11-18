/**
 * Unit tests for the Express app setup in `app.ts`.
 *
 * Importing the app does not connect to RabbitMQ (that only happens in
 * `server.ts`), so no mocking is needed here.
 *
 * @module tests/app
 */
import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../src/app.js';

/** Tests for the health check endpoint. */
describe('GET /health', () => {
  it('reports the service as ok', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', service: 'webshop-service' });
  });
});

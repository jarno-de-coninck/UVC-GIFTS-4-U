/**
 * Unit tests for the Express app setup in `app.ts`.
 *
 * The warehouse gets its work from RabbitMQ, so the app only has a health
 * check. Importing the app does not connect to RabbitMQ, so no mocking is needed.
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
    expect(res.body).toMatchObject({ status: 'ok', service: 'warehouse-service' });
  });
});

/**
 * Unit tests for the `/orders` routes.
 *
 * The order service is replaced by a fake, so these tests only check the HTTP
 * layer: that the route passes the body to the service and returns its result.
 *
 * @module tests/routes/orders
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

/** The order the fake service returns. */
const placedOrder = { id: '123', product: 'Printed mug', quantity: 2, createdAt: '2026-11-18T12:00:00.000Z' };
/** Fake order service, standing in for the real one in `services/index.ts`. */
const orderService = { placeOrder: jest.fn(() => placedOrder) };
jest.unstable_mockModule('../../src/services/index.js', () => ({ orderService }));

// ESM mocks only apply to modules imported after the mock is registered
const { app } = await import('../../src/app.js');

beforeEach(() => {
  jest.clearAllMocks();
});

/** Tests for `POST /orders`. */
describe('POST /orders', () => {
  it('passes the request body to the order service', async () => {
    await request(app).post('/orders').send({ product: 'Printed mug', quantity: 2 });

    expect(orderService.placeOrder).toHaveBeenCalledWith({ product: 'Printed mug', quantity: 2 });
  });

  it('responds 202 Accepted with the placed order', async () => {
    const res = await request(app).post('/orders').send({ product: 'Printed mug', quantity: 2 });

    expect(res.status).toBe(202);
    expect(res.body).toEqual(placedOrder);
  });
});

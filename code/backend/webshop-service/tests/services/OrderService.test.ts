/**
 * Unit tests for {@link OrderService}.
 *
 * Because the publisher is injected through the constructor, these tests just
 * pass in a fake publisher. No module mocking or RabbitMQ needed.
 *
 * @module tests/services/OrderService
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { OrderService, ORDERS_EXCHANGE } from '../../src/services/OrderService.js';
import type { MessagePublisher } from '../../src/types/index.js';

/** Fake publisher that records what was published instead of sending it anywhere. */
const publisher = { publish: jest.fn<MessagePublisher['publish']>() };

/** The service under test, wired to the fake publisher. */
const service = new OrderService(publisher);

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

/** Tests for placing an order. */
describe('OrderService.placeOrder', () => {
  it('returns the order with an id and createdAt added', () => {
    const order = service.placeOrder({ product: 'Printed mug', quantity: 2 });

    expect(order).toMatchObject({ product: 'Printed mug', quantity: 2 });
    expect(order.id).toEqual(expect.any(String));
    expect(new Date(order.createdAt).toString()).not.toBe('Invalid Date');
  });

  it('publishes the order to the orders exchange', () => {
    const order = service.placeOrder({ product: 'Printed T-shirt', quantity: 1 });

    expect(publisher.publish).toHaveBeenCalledTimes(1);
    expect(publisher.publish).toHaveBeenCalledWith(ORDERS_EXCHANGE, order);
  });

  it('gives every order a unique id', () => {
    const first = service.placeOrder({ product: 'Printed mug', quantity: 1 });
    const second = service.placeOrder({ product: 'Printed mug', quantity: 1 });

    expect(first.id).not.toBe(second.id);
  });
});

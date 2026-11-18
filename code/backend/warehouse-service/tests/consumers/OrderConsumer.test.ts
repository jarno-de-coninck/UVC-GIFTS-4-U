/**
 * Unit tests for {@link OrderConsumer}.
 *
 * Because the subscriber is injected through the constructor, these tests just
 * pass in a fake subscriber. No module mocking or RabbitMQ needed.
 *
 * @module tests/consumers/OrderConsumer
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { OrderConsumer, ORDERS_EXCHANGE, ORDERS_QUEUE } from '../../src/consumers/OrderConsumer.js';
import type { MessageHandler, MessageSubscriber, Order } from '../../src/types/index.js';

/** Fake subscriber that records the subscription instead of connecting anywhere. */
const subscriber = { subscribe: jest.fn<MessageSubscriber['subscribe']>(async () => {}) };

/** A sample order as the webshop would publish it. */
const order: Order = { id: '123', product: 'Printed mug', quantity: 2, createdAt: '2026-11-18T12:00:00.000Z' };

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

/** Tests for starting the consumer. */
describe('OrderConsumer.start', () => {
  it('subscribes to the orders exchange with the warehouse queue', async () => {
    await new OrderConsumer(subscriber).start();

    expect(subscriber.subscribe).toHaveBeenCalledWith(ORDERS_EXCHANGE, ORDERS_QUEUE, expect.any(Function));
  });

  it('routes every delivered message to handle()', async () => {
    const consumer = new OrderConsumer(subscriber);
    const handle = jest.spyOn(consumer, 'handle');
    await consumer.start();

    // Simulate the subscriber delivering a message to the registered handler
    const deliver = subscriber.subscribe.mock.calls[0][2] as MessageHandler;
    deliver(order);

    expect(handle).toHaveBeenCalledWith(order);
  });
});

/** Tests for processing a single order. */
describe('OrderConsumer.handle', () => {
  it('logs the received order', () => {
    new OrderConsumer(subscriber).handle(order);

    expect(console.log).toHaveBeenCalledWith('Received order:', order);
  });
});

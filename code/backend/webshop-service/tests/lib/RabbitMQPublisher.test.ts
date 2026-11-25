/**
 * Unit tests for {@link RabbitMQPublisher}.
 *
 * `amqplib` is replaced by a fake, so no RabbitMQ server is needed. Each test
 * creates its own publisher instance, so no state leaks between tests.
 *
 * @module tests/lib/RabbitMQPublisher
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Channel } from 'amqplib';

/** Fake AMQP channel recording every call the publisher makes. */
const channel = { assertExchange: jest.fn<Channel['assertExchange']>(), publish: jest.fn<Channel['publish']>() };
/** Fake `amqp.connect`, resolving to a connection that hands out the fake channel. */
const connect = jest.fn(async () => ({ createChannel: async () => channel }));
jest.unstable_mockModule('amqplib', () => ({ default: { connect } }));

// ESM mocks only apply to modules imported after the mock is registered
const { RabbitMQPublisher } = await import('../../src/lib/RabbitMQPublisher.js');

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

/** Tests for connecting and declaring exchanges. */
describe('RabbitMQPublisher.connect', () => {
  it('connects to the URL given to the constructor', async () => {
    await new RabbitMQPublisher('amqp://test-host:5672', []).connect();

    expect(connect).toHaveBeenCalledWith('amqp://test-host:5672');
  });

  it('declares every configured exchange as a durable fanout exchange', async () => {
    await new RabbitMQPublisher('amqp://test', ['orders', 'shipments']).connect();

    expect(channel.assertExchange).toHaveBeenCalledWith('orders', 'fanout', { durable: true });
    expect(channel.assertExchange).toHaveBeenCalledWith('shipments', 'fanout', { durable: true });
  });
});

/** Tests for publishing messages. */
describe('RabbitMQPublisher.publish', () => {
  it('throws if called before connect', () => {
    const publisher = new RabbitMQPublisher('amqp://test', ['orders']);

    expect(() => publisher.publish('orders', {})).toThrow('RabbitMQ channel is not initialised');
  });

  it('publishes the message as a persistent JSON buffer to the exchange', async () => {
    const publisher = new RabbitMQPublisher('amqp://test', ['orders']);
    await publisher.connect();
    const order = { id: '123', product: 'Printed mug' };

    publisher.publish('orders', order);

    expect(channel.publish).toHaveBeenCalledWith('orders', '', expect.any(Buffer), { persistent: true });
    const body: Buffer = channel.publish.mock.calls[0][2];
    expect(JSON.parse(body.toString())).toEqual(order);
  });
});

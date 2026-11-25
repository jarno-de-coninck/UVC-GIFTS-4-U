/**
 * Unit tests for {@link RabbitMQSubscriber}.
 *
 * `amqplib` is replaced by a fake, so no RabbitMQ server is needed. The tests
 * simulate RabbitMQ delivering a message by calling the callback the
 * subscriber registered with `channel.consume`.
 *
 * @module tests/lib/RabbitMQSubscriber
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Channel, ConsumeMessage } from 'amqplib';
import type { MessageHandler } from '../../src/types/index.js';

/** Signature of the callback passed to `channel.consume`. */
type OnMessage = (msg: ConsumeMessage | null) => void;

/** Fake AMQP channel recording every call the subscriber makes. */
const channel = {
  assertExchange: jest.fn<Channel['assertExchange']>(),
  assertQueue: jest.fn<Channel['assertQueue']>(),
  bindQueue: jest.fn<Channel['bindQueue']>(),
  consume: jest.fn<Channel['consume']>(),
  ack: jest.fn<Channel['ack']>(),
};
/** Fake `amqp.connect`, resolving to a connection that hands out the fake channel. */
const connect = jest.fn(async () => ({ createChannel: async () => channel }));
jest.unstable_mockModule('amqplib', () => ({ default: { connect } }));

// ESM mocks only apply to modules imported after the mock is registered
const { RabbitMQSubscriber } = await import('../../src/lib/RabbitMQSubscriber.js');

/** Builds a fake RabbitMQ message with a JSON body. */
const fakeMessage = (body: unknown) => ({ content: Buffer.from(JSON.stringify(body)) }) as ConsumeMessage;

/** Returns the callback the subscriber registered with `channel.consume`, i.e. what RabbitMQ calls on delivery. */
const deliver = (): OnMessage => channel.consume.mock.calls[0][1];

/** Subscribes a fresh subscriber to the `orders` exchange with the given handler. */
const subscribeWith = (handler: MessageHandler) =>
  new RabbitMQSubscriber('amqp://test').subscribe('orders', 'warehouse.orders', handler);

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

/** Tests for setting up the subscription. */
describe('RabbitMQSubscriber.subscribe setup', () => {
  it('connects to the URL given to the constructor', async () => {
    await new RabbitMQSubscriber('amqp://test-host:5672').subscribe('orders', 'warehouse.orders', jest.fn());

    expect(connect).toHaveBeenCalledWith('amqp://test-host:5672');
  });

  it('declares the fanout exchange and its own durable queue, and binds them', async () => {
    await subscribeWith(jest.fn());

    expect(channel.assertExchange).toHaveBeenCalledWith('orders', 'fanout', { durable: true });
    expect(channel.assertQueue).toHaveBeenCalledWith('warehouse.orders', { durable: true });
    expect(channel.bindQueue).toHaveBeenCalledWith('warehouse.orders', 'orders', '');
  });

  it('starts consuming from its queue', async () => {
    await subscribeWith(jest.fn());

    expect(channel.consume).toHaveBeenCalledWith('warehouse.orders', expect.any(Function));
  });
});

/** Tests for what happens when RabbitMQ delivers a message. */
describe('RabbitMQSubscriber.subscribe delivery', () => {
  it('passes each delivered message to the handler as a parsed object', async () => {
    const handler = jest.fn();
    await subscribeWith(handler);

    deliver()(fakeMessage({ id: '123', product: 'Printed mug' }));

    expect(handler).toHaveBeenCalledWith({ id: '123', product: 'Printed mug' });
  });

  it('acknowledges the message after the handler has run', async () => {
    const handler = jest.fn();
    await subscribeWith(handler);
    const msg = fakeMessage({ id: '123' });

    deliver()(msg);

    expect(channel.ack).toHaveBeenCalledWith(msg);
    expect(handler.mock.invocationCallOrder[0]).toBeLessThan(channel.ack.mock.invocationCallOrder[0]);
  });

  it('does not acknowledge the message if the handler throws, so RabbitMQ can redeliver it', async () => {
    await subscribeWith(() => {
      throw new Error('boom');
    });

    expect(() => deliver()(fakeMessage({ id: '123' }))).toThrow('boom');
    expect(channel.ack).not.toHaveBeenCalled();
  });

  it('ignores a null message (consumer cancelled by RabbitMQ)', async () => {
    const handler = jest.fn();
    await subscribeWith(handler);

    deliver()(null);

    expect(handler).not.toHaveBeenCalled();
    expect(channel.ack).not.toHaveBeenCalled();
  });
});

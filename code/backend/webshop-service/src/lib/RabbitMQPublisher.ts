/**
 * RabbitMQ implementation of {@link MessagePublisher}.
 *
 * @module lib/RabbitMQPublisher
 */
import amqp, { Channel } from 'amqplib';
import type { MessagePublisher } from '../types/index.js';

/**
 * Publishes messages to RabbitMQ over a single long-lived channel.
 *
 * The channel is private: callers can only publish, not reach into the
 * connection. Call {@link RabbitMQPublisher.connect} once on startup before
 * publishing.
 *
 * @example
 * const publisher = new RabbitMQPublisher('amqp://localhost', ['orders']);
 * await publisher.connect();
 * publisher.publish('orders', { product: 'Printed mug' });
 */
export class RabbitMQPublisher implements MessagePublisher {
  /** The open channel, set by {@link RabbitMQPublisher.connect}. */
  private channel?: Channel;

  /**
   * @param url - AMQP URL of the broker, e.g. `amqp://guest:guest@localhost:5672`.
   * @param exchanges - Fanout exchanges to declare on connect, so they exist before the first publish.
   */
  constructor(
    private readonly url: string,
    private readonly exchanges: string[],
  ) {}

  /**
   * Connects to RabbitMQ and declares the configured exchanges.
   *
   * Exchanges are `fanout` (every bound queue gets a copy of each message)
   * and `durable` (they survive a broker restart).
   *
   * @throws If the broker cannot be reached.
   */
  async connect(): Promise<void> {
    const connection = await amqp.connect(this.url);
    const channel = await connection.createChannel();
    for (const exchange of this.exchanges) {
      await channel.assertExchange(exchange, 'fanout', { durable: true });
    }
    this.channel = channel;
    console.log('Connected to RabbitMQ');
  }

  /**
   * Publishes a message as JSON.
   *
   * The message is marked `persistent`, so RabbitMQ writes it to disk and it
   * survives a broker restart while waiting in a durable queue.
   *
   * @param exchange - Exchange to publish to.
   * @param message - Any JSON-serialisable value.
   * @throws If {@link RabbitMQPublisher.connect} has not been called yet.
   */
  publish(exchange: string, message: unknown): void {
    if (!this.channel) throw new Error('RabbitMQ channel is not initialised');
    // routing key '' is ignored by fanout exchanges
    this.channel.publish(exchange, '', Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}

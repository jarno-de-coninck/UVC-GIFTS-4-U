/**
 * RabbitMQ implementation of {@link MessageSubscriber}.
 *
 * @module lib/RabbitMQSubscriber
 */
import amqp from 'amqplib';
import type { MessageHandler, MessageSubscriber } from '../types/index.js';

/**
 * Receives messages from RabbitMQ fanout exchanges.
 *
 * RabbitMQ pushes messages over the open connection as soon as they arrive;
 * there is no polling.
 *
 * @example
 * const subscriber = new RabbitMQSubscriber('amqp://localhost');
 * await subscriber.subscribe('orders', 'warehouse.orders', (msg) => console.log(msg));
 */
export class RabbitMQSubscriber implements MessageSubscriber {
  /** @param url - AMQP URL of the broker, e.g. `amqp://guest:guest@localhost:5672`. */
  constructor(private readonly url: string) {}

  /**
   * Subscribes to an exchange and calls `handler` for every message that arrives.
   *
   * Declares the exchange and queue (creating them if they don't exist yet),
   * binds the queue to the exchange and starts consuming.
   *
   * Each message is parsed from JSON before it is passed to `handler`, and is
   * acknowledged (removed from the queue) only once `handler` returns. If the
   * handler throws, the message is not acked, so RabbitMQ can redeliver it.
   *
   * @param exchange - Fanout exchange to subscribe to.
   * @param queue - This service's own queue. Each subscribing service needs a
   *   unique queue name to get its own copy of every message.
   * @param handler - Called with the parsed message body.
   * @throws If the broker cannot be reached.
   */
  async subscribe(exchange: string, queue: string, handler: MessageHandler): Promise<void> {
    const connection = await amqp.connect(this.url);
    const channel = await connection.createChannel();
    // Same settings as the publisher; assert* creates the exchange/queue if they don't exist yet
    await channel.assertExchange(exchange, 'fanout', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, '');
    console.log(`Connected to RabbitMQ, queue "${queue}" subscribed to exchange "${exchange}"`);

    await channel.consume(queue, (msg) => {
      // RabbitMQ sends null when the consumer is cancelled, e.g. the queue was deleted
      if (!msg) return;
      handler(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    });
  }
}

/**
 * The service-wide RabbitMQ subscriber instance.
 *
 * Kept in its own module so the consumers can use it, while tests can
 * construct their own instances instead.
 *
 * @module lib/rabbitmq
 */
import { RabbitMQSubscriber } from './RabbitMQSubscriber.js';

/** Shared subscriber, connecting to the broker in `RABBITMQ_URL`. */
export const rabbitMQSubscriber = new RabbitMQSubscriber(
  process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
);

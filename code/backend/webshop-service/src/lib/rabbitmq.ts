/**
 * The service-wide RabbitMQ publisher instance.
 *
 * Kept in its own module so `server.ts` can connect it and the services can
 * use it, while tests can construct their own instances instead.
 *
 * @module lib/rabbitmq
 */
import { RabbitMQPublisher } from './RabbitMQPublisher.js';
import { ORDERS_EXCHANGE } from '../services/OrderService.js';

/** Shared publisher; connected once on startup in `server.ts`. */
export const rabbitMQPublisher = new RabbitMQPublisher(
  process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
  [ORDERS_EXCHANGE],
);

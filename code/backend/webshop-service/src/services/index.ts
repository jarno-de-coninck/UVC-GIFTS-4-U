/**
 * Service instances used by the routes, wired to their real dependencies.
 *
 * @module services
 */
import { OrderService } from './OrderService.js';
import { rabbitMQPublisher } from '../lib/rabbitmq.js';

/** Shared order service, publishing through the service-wide RabbitMQ publisher. */
export const orderService = new OrderService(rabbitMQPublisher);

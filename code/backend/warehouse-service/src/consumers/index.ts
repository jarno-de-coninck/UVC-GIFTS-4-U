/**
 * Consumer instances, wired to their real dependencies.
 *
 * @module consumers
 */
import { OrderConsumer } from './OrderConsumer.js';
import { rabbitMQSubscriber } from '../lib/rabbitmq.js';

/** Shared order consumer, receiving through the service-wide RabbitMQ subscriber. */
export const orderConsumer = new OrderConsumer(rabbitMQSubscriber);

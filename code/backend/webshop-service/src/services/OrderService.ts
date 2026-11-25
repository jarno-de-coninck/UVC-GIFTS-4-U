/**
 * Business logic for placing orders.
 *
 * @module services/OrderService
 */
import { randomUUID } from 'node:crypto';
import type { MessagePublisher, Order, OrderInput } from '../types/index.js';

/** Exchange that order messages are published to. */
export const ORDERS_EXCHANGE = 'orders';

/**
 * Places orders by publishing them to the orders exchange.
 *
 * The publisher is injected through the constructor (dependency injection),
 * so the service doesn't know or care that RabbitMQ is behind it, and tests
 * can pass in a fake publisher.
 *
 * @example
 * const service = new OrderService(rabbitMQPublisher);
 * const order = service.placeOrder({ product: 'Printed mug', quantity: 2 });
 */
export class OrderService {
  /** @param publisher - Where placed orders are published to. */
  constructor(private readonly publisher: MessagePublisher) {}

  /**
   * Creates an order from the customer's input and publishes it.
   *
   * Proof of concept: the input is not validated and nothing is saved to a
   * database. An `id` and `createdAt` are added before publishing.
   *
   * @param input - The customer's order.
   * @returns The order exactly as it was published.
   */
  placeOrder(input: OrderInput): Order {
    const order: Order = { id: randomUUID(), ...input, createdAt: new Date().toISOString() };
    this.publisher.publish(ORDERS_EXCHANGE, order);
    console.log(`Published order ${order.id} to exchange "${ORDERS_EXCHANGE}"`);
    return order;
  }
}

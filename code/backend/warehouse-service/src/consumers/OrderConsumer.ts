/**
 * Handles order messages coming from the webshop.
 *
 * @module consumers/OrderConsumer
 */
import type { MessageSubscriber, Order } from '../types/index.js';

/** Fanout exchange the webshop publishes orders to. */
export const ORDERS_EXCHANGE = 'orders';

/** The warehouse's own queue on the orders exchange, so it gets its own copy of every order. */
export const ORDERS_QUEUE = 'warehouse.orders';

/**
 * Receives orders from the orders exchange and processes them.
 *
 * A consumer works like a route handler, except it's triggered by a message
 * instead of an HTTP request. The subscriber is injected through the
 * constructor (dependency injection), so tests can pass in a fake one.
 *
 * @example
 * const consumer = new OrderConsumer(rabbitMQSubscriber);
 * await consumer.start();
 */
export class OrderConsumer {
  /** @param subscriber - Where orders are received from. */
  constructor(private readonly subscriber: MessageSubscriber) {}

  /** Starts listening for orders. Call once on startup. */
  async start(): Promise<void> {
    // Proof of concept: the message is trusted to be an Order, not validated
    await this.subscriber.subscribe(ORDERS_EXCHANGE, ORDERS_QUEUE, (message) => this.handle(message as Order));
  }

  /**
   * Processes one order.
   *
   * Proof of concept: only logs the order to show the message arrived. In the
   * real service this would validate the order (e.g. with zod) and reserve stock.
   *
   * @param order - The received order.
   */
  handle(order: Order): void {
    console.log('Received order:', order);
  }
}

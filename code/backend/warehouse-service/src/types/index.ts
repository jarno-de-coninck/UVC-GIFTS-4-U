/**
 * Shared types for the warehouse-service.
 *
 * @module types
 */

/**
 * An order as received from the webshop.
 *
 * Each service keeps its own copy of this type, so services stay independent
 * and don't share code.
 */
export interface Order {
  id: string;
  product: string;
  quantity: number;
  createdAt: string;
}

/** Callback that receives one parsed message body. */
export type MessageHandler = (message: unknown) => void;

/**
 * Anything that can deliver messages from an exchange.
 *
 * Consumers depend on this interface instead of on RabbitMQ directly, so the
 * broker can be swapped out (or faked in tests) without changing the consumer.
 */
export interface MessageSubscriber {
  /**
   * Starts delivering messages from `exchange` to `handler`.
   *
   * @param exchange - Exchange to receive messages from.
   * @param queue - The subscriber's own queue on that exchange.
   * @param handler - Called once for every message.
   */
  subscribe(exchange: string, queue: string, handler: MessageHandler): Promise<void>;
}

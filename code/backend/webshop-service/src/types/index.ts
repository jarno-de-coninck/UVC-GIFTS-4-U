/**
 * Shared types for the webshop-service.
 *
 * @module types
 */

/** What a customer sends when placing an order. */
export interface OrderInput {
  product: string;
  quantity: number;
}

/** An order as published to the message broker. */
export interface Order extends OrderInput {
  id: string;
  createdAt: string;
}

/**
 * Anything that can publish messages to an exchange.
 *
 * Services depend on this interface instead of on RabbitMQ directly, so the
 * broker can be swapped out (or faked in tests) without changing the service.
 */
export interface MessagePublisher {
  /**
   * Publishes a message to an exchange.
   *
   * @param exchange - Name of the exchange to publish to.
   * @param message - Any JSON-serialisable value.
   */
  publish(exchange: string, message: unknown): void;
}

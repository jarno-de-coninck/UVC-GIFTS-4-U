/**
 * Order routes for the webshop-service.
 *
 * Routes only translate HTTP to service calls; the logic lives in
 * {@link OrderService}.
 *
 * @module routes/orders
 */
import { Router } from 'express';
import { orderService } from '../services/index.js';

/** Router mounted at `/orders`. */
export const ordersRouter = Router();

/**
 * `POST /orders` - places an order.
 *
 * Responds with `202 Accepted` and the published order: the order has been
 * handed to RabbitMQ, but subscribers (e.g. the warehouse) process it later.
 *
 * @example
 * // Request
 * POST /orders  { "product": "Printed mug", "quantity": 2 }
 * // Response 202
 * { "id": "c1d6…", "product": "Printed mug", "quantity": 2, "createdAt": "2026-11-18T15:39:18.011Z" }
 */
ordersRouter.post('/', (req, res) => {
  const order = orderService.placeOrder(req.body);
  res.status(202).json(order);
});

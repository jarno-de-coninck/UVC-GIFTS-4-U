/**
 * Express app for the webshop-service.
 *
 * Kept separate from `server.ts` so tests can import the app without
 * connecting to RabbitMQ or opening a port.
 *
 * @module app
 */
import express from 'express';
import cors from 'cors';
import { ordersRouter } from './routes/orders.js';

/** The configured Express app with all routes mounted. */
export const app = express();

app.use(express.json());
app.use(cors());

/** `GET /health` - liveness check used to see if the service is up. */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'webshop-service', environment: process.env.NODE_ENV || 'development' });
});

app.use('/orders', ordersRouter);

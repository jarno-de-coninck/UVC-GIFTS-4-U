/**
 * Express app for the warehouse-service.
 *
 * The warehouse receives its work from RabbitMQ, not HTTP; the app only
 * exposes a health check. Kept separate from `server.ts` so tests can import
 * it without connecting to RabbitMQ or opening a port.
 *
 * @module app
 */
import express from 'express';

/** The configured Express app. */
export const app = express();

/** `GET /health` - liveness check used to see if the service is up. */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'warehouse-service', environment: process.env.NODE_ENV || 'development' });
});

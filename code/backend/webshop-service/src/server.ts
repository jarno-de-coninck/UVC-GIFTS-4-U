/**
 * Entry point for the webshop-service.
 *
 * Loads environment variables, connects to RabbitMQ and then starts the HTTP
 * server. The connection is made first so no order can arrive before the
 * service is able to publish it.
 *
 * @module server
 */
// Must be the first import: other modules read process.env when they are loaded
import 'dotenv/config';
import { app } from './app.js';
import { rabbitMQPublisher } from './lib/rabbitmq.js';

const PORT = process.env.PORT || 4002;
const NODE_ENV = process.env.NODE_ENV || 'development';

await rabbitMQPublisher.connect();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});

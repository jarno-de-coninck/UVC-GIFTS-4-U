/**
 * Entry point for the warehouse-service.
 *
 * Loads environment variables, starts the order consumer and then starts the
 * HTTP server for the health check.
 *
 * @module server
 */
// Must be the first import: other modules read process.env when they are loaded
import 'dotenv/config';
import { app } from './app.js';
import { orderConsumer } from './consumers/index.js';

const PORT = process.env.PORT || 4003;
const NODE_ENV = process.env.NODE_ENV || 'development';

await orderConsumer.start();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});

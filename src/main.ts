import app from './app';
import config from './config';

const port = config.PORT;

// starting the express server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Setup for graceful shut down
export const gracefulshutdown = async (err: Error | string) => {
  if (err && typeof err !== 'string') {
    console.log(err);
  }
  // closing the server
  server.close(() => {
    console.log('Shutting down');
    process.exit(0);
  });
};

// handling unhandled exceptions and errors
process.on('uncaughtException', gracefulshutdown);

process.on('unhandledRejection', gracefulshutdown);

process.on('SIGTERM', gracefulshutdown);

process.on('SIGINT', gracefulshutdown);

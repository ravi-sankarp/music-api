import winston from 'winston';
import 'winston-daily-rotate-file';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Create a Winston logger instance
const winstonLogger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }),
    // File transport with rotation
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.json',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d' // Retain logs for 7 days
    })
  ]
});

// Export a logger function to standardize usage
export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => winstonLogger.info(message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => winstonLogger.warn(message, meta),
  error: (message: string, meta?: Record<string, unknown>) => winstonLogger.error(message, meta),
  debug: (message: string, meta?: Record<string, unknown>) => winstonLogger.debug(message, meta)
};

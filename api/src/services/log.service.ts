import winston from 'winston';
import { Environment } from 'environment';

export const LogService = winston.createLogger({
  level: Environment.isDevelopment ? 'debug' : 'warn',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

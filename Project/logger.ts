import winston from "winston";
import { createLogger, transports, format } from "winston";

const combinedLogger = new winston.transports.File({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
  ),
  filename: "./logs/combined.log",
  level: "info",
})

const infoLogger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
  ),
  defaultMeta: { service: "log-service" },
  transports: [
    new winston.transports.File({
      filename: "./logs/info.log",
      level: "info",
    }),
    combinedLogger
  ],
});

const errorLogger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
  ),
  defaultMeta: { service: "log-service" },
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    combinedLogger
  ],
});

const logger = {
  info: (params:string) => {
    return infoLogger.info(params);
  },
  error: (params:string) => {
    return errorLogger.error(params);
  },
};

export default logger;
import winston from 'winston';

class Logger {
  private static instance: winston.Logger;

  private static getInstance(): winston.Logger {
    if (!Logger.instance) {
      const level = process.env.LOG_LEVEL || 'info';
      const transports = [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.label({ label: 'Backend' }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              ({ level, message, label, timestamp }) =>
                `${level.toUpperCase()} ${timestamp} [${label}]: ${message}`,
            ),
          ),
          level,
        }),
      ];

      Logger.instance = winston.createLogger({
        level: level,
        transports: transports,
        exitOnError: false,
      });
    }

    return Logger.instance;
  }

  static error = (msg: string, details?: unknown) => Logger.getInstance().error(msg, details);
  static info = (msg: string, details?: unknown) => Logger.getInstance().info(msg, details);
  static warn = (msg: string, details?: unknown) => Logger.getInstance().warn(msg, details);
  static debug = (msg: string, details?: unknown) => Logger.getInstance().debug(msg, details);
  static silly = (msg: string, details?: unknown) => Logger.getInstance().silly(msg, details);
}

export { Logger };

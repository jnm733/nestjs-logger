import * as winston from 'winston';
import { LogLevel } from '@nestjs-logger/shared/logger/domain/log';

enum LogColors {
  red = '\x1b[31m',
  green = '\x1b[32m',
  yellow = '\x1b[33m',
  blue = '\x1b[34m',
  magenta = '\x1b[35m',
  cyan = '\x1b[36m',
  pink = '\x1b[38;5;206m',
}

export default class ConsoleTransport {
  public static createColorize() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf((log) => {
          const logData: any = log.data;
          const color = this.mapLogLevelColor(log.level as LogLevel);
          const prefix = `${logData.label ? `[${logData.label}]` : ''}`;
          return `${this.colorize(color, prefix + '  -')} ${log.timestamp}    ${
            logData.correlationId
              ? `(${this.colorize(LogColors.cyan, logData.correlationId)})`
              : ''
          } ${this.colorize(color, log.level.toUpperCase())} ${
            logData.sourceClass
              ? `${this.colorize(LogColors.cyan, `[${logData.sourceClass}]`)}`
              : ''
          } ${this.colorize(
            color,
            log.message + ' - ' + (logData.error ? logData.error : ''),
          )}${
            logData.durationMs !== undefined
              ? this.colorize(color, ' +' + logData.durationMs + 'ms')
              : ''
          }${
            logData.stack ? this.colorize(color, `  - ${logData.stack}`) : ''
          }${
            logData.props
              ? `\n  - Props: ${JSON.stringify(logData.props, null, 4)}`
              : ''
          }`;
        }),
      ),
    });
  }

  private static colorize(color: LogColors, message: string): string {
    return `${color}${message}\x1b[0m`;
  }

  private static mapLogLevelColor(level: LogLevel): LogColors {
    switch (level) {
      case LogLevel.Debug:
        return LogColors.blue;
      case LogLevel.Info:
        return LogColors.green;
      case LogLevel.Warn:
        return LogColors.yellow;
      case LogLevel.Error:
        return LogColors.red;
      case LogLevel.Fatal:
        return LogColors.magenta;
      case LogLevel.Emergency:
        return LogColors.pink;
      default:
        return LogColors.cyan;
    }
  }
}

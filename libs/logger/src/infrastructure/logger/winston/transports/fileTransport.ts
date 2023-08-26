import * as winston from 'winston';

export default class FileTransport {
  public static create() {
    return new winston.transports.File({
      dirname: 'logs',
    });
  }
}

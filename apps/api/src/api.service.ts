import { Inject, Injectable } from '@nestjs/common';
import Logger, { LoggerKey } from '@app/logger/domain/logger/logger';

@Injectable()
export class ApiService {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  async getHello(): Promise<string> {
    // Profile
    this.logger.startProfile('getHello');

    // Await random time
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 1000)),
    );

    // Debug
    this.logger.debug(
      'I am a debug message!',
      {
        props: {
          foo: 'bar',
          baz: 'qux',
        },
      },
      'getHello',
    );

    // Info
    this.logger.info('I am an info message!', {
      props: {
        foo: 'bar',
        baz: 'qux',
      },
    });

    // Warn
    this.logger.warn('I am a warn message!', {
      props: {
        foo: 'bar',
        baz: 'qux',
      },
      error: new Error('Hello World!'),
    });

    // Error
    this.logger.error('I am an error message!', {
      props: {
        foo: 'bar',
        baz: 'qux',
      },
      error: new Error('Hello World!'),
    });

    // Fatal
    this.logger.fatal('I am a fatal message!', {
      props: {
        foo: 'bar',
        baz: 'qux',
      },
      error: new Error('Hello World!'),
    });

    // Emergency
    this.logger.emergency('I am an emergency message!', {
      props: {
        foo: 'bar',
        baz: 'qux',
      },
      error: new Error('Hello World!'),
    });

    return 'Hello World!';
  }
}

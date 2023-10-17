import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import WinstonLogger, {
  WinstonLoggerTransportsKey,
} from '@nestjs-logger/shared/logger/infrastructure/winston/winstonLogger';
import Logger, {
  LoggerBaseKey,
  LoggerKey,
} from '@nestjs-logger/shared/logger/domain/logger';
import NestjsLoggerServiceAdapter from '@nestjs-logger/shared/logger/infrastructure/nestjs/nestjsLoggerServiceAdapter';
import SlackTransport from '@nestjs-logger/shared/logger/infrastructure/winston/transports/slackTransport';
import ConsoleTransport from '@nestjs-logger/shared/logger/infrastructure/winston/transports/consoleTransport';
import * as morgan from 'morgan';
import LoggerContextWrapper from '@nestjs-logger/shared/logger/infrastructure/nestjs/loggerContextWrapper';
import FileTransport from '@nestjs-logger/shared/logger/infrastructure/winston/transports/fileTransport';
import { ConfigService } from '@nestjs-logger/shared/config/domain/services/configService';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: LoggerBaseKey,
      useClass: WinstonLogger,
    },
    {
      provide: LoggerKey,
      useClass: LoggerContextWrapper,
    },
    {
      provide: NestjsLoggerServiceAdapter,
      useFactory: (logger: Logger) => new NestjsLoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },

    {
      provide: WinstonLoggerTransportsKey,
      useFactory: (configService: ConfigService) => {
        const transports = [];

        transports.push(ConsoleTransport.createColorize());

        transports.push(FileTransport.create());

        if (configService.isProduction) {
          if (configService.slackWebhookUrl) {
            transports.push(
              SlackTransport.create(configService.slackWebhookUrl),
            );
          }
        }

        return transports;
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerKey, NestjsLoggerServiceAdapter],
})
export class LoggerModule implements NestModule {
  public constructor(
    @Inject(LoggerKey) private logger: Logger,
    private configService: ConfigService,
  ) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(this.configService.isProduction ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}

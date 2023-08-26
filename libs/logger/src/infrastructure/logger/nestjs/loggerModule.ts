import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import WinstonLogger, {
  WinstonLoggerProvidersKey,
} from '@app/logger/infrastructure/logger/winston/winstonLogger';
import Logger, {
  LoggerBaseKey,
  LoggerKey,
} from '@app/logger/domain/logger/logger';
import NestjLoggerServiceAdapter from '@app/logger/infrastructure/logger/nestjs/nestjLoggerServiceAdapter';
import SlackTransport from '@app/logger/infrastructure/logger/winston/transports/slackTransport';
import ConsoleTransport from '@app/logger/infrastructure/logger/winston/transports/consoleTransport';
import * as morgan from 'morgan';
import LoggerContextWrapper from '@app/logger/infrastructure/logger/loggerContextWrapper';
import FileTransport from '@app/logger/infrastructure/logger/winston/transports/fileTransport';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from '@app/shared/infrastructure/nestjs/interceptors/contextInterceptor';
import { ConfigService } from '@app/config/domain/services/configService';

@Global()
@Module({
  imports: [RequestContextModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
    {
      provide: LoggerBaseKey,
      useClass: WinstonLogger,
    },
    {
      provide: LoggerKey,
      useClass: LoggerContextWrapper,
    },
    {
      provide: NestjLoggerServiceAdapter,
      useFactory: (logger: Logger) => new NestjLoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },
    {
      provide: WinstonLoggerProvidersKey,
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
  exports: [LoggerKey, NestjLoggerServiceAdapter],
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

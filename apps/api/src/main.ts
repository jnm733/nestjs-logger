import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import NestjsLoggerServiceAdapter from '@nestjs-logger/shared/logger/infrastructure/nestjs/nestjsLoggerServiceAdapter';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(NestjsLoggerServiceAdapter));

  await app.listen(3000);
}
bootstrap();

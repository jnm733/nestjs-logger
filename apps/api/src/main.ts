import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import NestjLoggerServiceAdapter from '@app/logger/infrastructure/logger/nestjs/nestjLoggerServiceAdapter';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(NestjLoggerServiceAdapter));

  await app.listen(3000);
}
bootstrap();

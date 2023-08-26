import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { LoggerModule } from '@app/logger/infrastructure/logger/nestjs/loggerModule';
import { ConfigModule } from '@app/config/infrastructure/nestjs/configModule';

@Module({
  imports: [LoggerModule, ConfigModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

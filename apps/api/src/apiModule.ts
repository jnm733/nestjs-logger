import { Module } from '@nestjs/common';
import { ApiHttpController } from './apiHttpController';
import { ApiService } from './apiService';
import { LoggerModule } from '@nestjs-logger/shared/logger/infrastructure/nestjs/loggerModule';
import { ConfigModule } from '@nestjs-logger/shared/config/infrastructure/nestjs/configModule';
import { ContextModule } from '@nestjs-logger/shared/context/infrastructure/nestjs/contextModule';

@Module({
  imports: [LoggerModule, ConfigModule, ContextModule],
  controllers: [ApiHttpController],
  providers: [ApiService],
})
export class ApiModule {}

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { TestController } from './controller/TestController';
import { AppService } from './app.service';
import { RegistryService } from './service/RegistryService';
import { LoggerService } from './service/LoggerService';
import { AllExceptionsFilter } from './filter/AllExceptionFilter';

@Module({
  imports: [],
  controllers: [AppController,TestController],
  providers: [AppService, RegistryService, LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }],
})
export class AppModule {}

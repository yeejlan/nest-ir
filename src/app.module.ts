import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AllControllers } from './controller';
import { AppService } from './app.service';
import { AllServices } from './service';
import { AllExceptionsFilter } from './filter/AllExceptionFilter';

@Module({
  imports: [],
  controllers: [AppController,...AllControllers],
  providers: [AppService, ...AllServices,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }],
})
export class AppModule {}

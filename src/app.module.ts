import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllControllers } from './controller';
import { AllServices } from './service';
import { AllExceptionsFilter } from './filter/AllExceptionFilter';

@Module({
  imports: [],
  controllers: [...AllControllers],
  providers: [...AllServices,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }],
})
export class AppModule {}

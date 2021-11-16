import {
  ExceptionFilter,
  Catch,
  Inject,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { UserException } from '../exceptions';
import { ResoponseCode } from '../lib/ResponseCode';
import { RegistryService } from '../service/RegistryService';
import { LoggerService } from '../service/LoggerService';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  @Inject()
  private readonly logger: LoggerService;
  @Inject()
  private readonly registry: RegistryService;

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let code: number = ResoponseCode.BAD_RESULT;
    let status: number = 500;
    if(exception.hasOwnProperty('code')) {
      code = +exception['code'] || 0;
      if(code != 0 && code < ResoponseCode.BAD_RESULT){
        status = code;
      }
    }

    if(exception instanceof UserException) {
      code = +UserException['code'] || 0;
    }else if(exception instanceof HttpException) {
      code = status = exception.getStatus();
    }

    let message = String(exception);
    let type = '';
    if(exception.hasOwnProperty('type')) {
      type = exception['type'] + ': ';
    }    
    if(exception instanceof Error) {
      message = exception.message;
      this.logger.log(type + exception.stack);
    }else{
      this.logger.log(type + message);
    }
    if(envBool('app_debug') === false) {
      if(exception instanceof UserException) {
        //pass
      }else{
        message = 'Internal Server Error';
      }
      
    }

    response.status(status).json({
      code: code,
      message: type + message,
      data: null,
      request_id: this.registry.getRequestId(true),
    });
  }
}
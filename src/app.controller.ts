import { Controller, Get, Param, HttpException} from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerException } from './exceptions';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('find-all')
  findAll() {
    let a:boolean = envBool('app_a');
    if(a == true){
      return true
    }
    return [a,5167];
  }

  @Get('/cat/:id')
  findOne(@Param('id') id: string) {
    try{
      throwError(ControllerException.name, 'cat not found', 1001);
    }catch(e){
      console.log(e);
      if(e instanceof Error){
        console.log('error type');
      }
      console.log(typeof e);
    }
    return `This action returns a #${id} cat`;
  }
}


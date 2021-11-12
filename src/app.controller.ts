import { Controller, Get, Param, HttpException} from '@nestjs/common';
import { AppService } from './app.service';


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
      throwError(AppController.name, 'cat not found', 1001);
    }catch(e){
      console.log(e);
    }
    return `This action returns a #${id} cat`;
  }
}

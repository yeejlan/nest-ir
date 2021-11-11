import { Controller, Get, Param, HttpException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('find-all')
  findAll() {
    let a:boolean = this.configService.get('app_a');
    if(a == true){
      return true
    }
    return [a,5167];
  }

  @Get('/cat/:id')
  findOne(@Param('id') id: string) {
    throw new HttpException('cat not found', 200);
    return `This action returns a #${id} cat`;
  }
}

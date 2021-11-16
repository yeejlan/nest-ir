import { Controller, Get, Param, HttpException} from '@nestjs/common';
import { ControllerException } from '../exceptions';
import { RegistryService } from '../service/RegistryService';


@Controller('test')
export class TestController {
  constructor(private readonly registryService: RegistryService) {}

  @Get('id')
  request_id() {
    let id1 = this.registryService.getRequestId();
    let id2 = this.registryService.getRequestId();
    let id3 = this.registryService.getRequestId(true);
    return [id1,id2,id3];
  }

  @Get('cat/:id')
  findOne(@Param('id') id: string) {

    throwError(ControllerException.name, 'Cat not found.', 1001);
  }
}


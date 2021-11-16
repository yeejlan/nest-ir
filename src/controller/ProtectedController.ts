import { Controller, Get} from '@nestjs/common';


@Controller('protected')
export class ProtectedController {

  @Get()
  my_secret_view() {
    return 'this is secret.';
  }
}


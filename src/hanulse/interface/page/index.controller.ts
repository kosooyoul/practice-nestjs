import { Controller, Get } from '@nestjs/common';

@Controller()
export class HanulseIndexController {
  @Get('/')
  index(): string {
    return 'Hello World!';
  }
}

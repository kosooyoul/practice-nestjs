import { Controller, Get } from '@nestjs/common';
import { IndexService } from '@/hanulse/application/service/index.service';

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get('/')
  index(): string {
    return this.indexService.index();
  }
}

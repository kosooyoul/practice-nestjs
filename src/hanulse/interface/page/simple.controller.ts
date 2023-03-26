import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HanulseSimpleController {
  @Get('/simple')
  renderSimplePage(@Res() response: Response) {
    response.render('simple', {
      title: 'Hanulse',
      items: [
        { title: 'Sample title 1', description: 'Sample description 1' },
        { title: 'Sample title 2', description: 'Sample description 2' },
      ],
    });
  }
}

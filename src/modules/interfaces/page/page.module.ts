import { Module } from '@nestjs/common';
import { IndexModule } from '@/modules/application/index/index.module';
import { IndexController } from './index.controller';

@Module({
  imports: [IndexModule],
  controllers: [IndexController],
})
export class PageModule {}

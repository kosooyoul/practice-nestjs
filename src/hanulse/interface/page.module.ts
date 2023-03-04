import { Module } from '@nestjs/common';
import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { IndexController } from './page/index.controller';

@Module({
  imports: [HanulseServiceModule],
  controllers: [IndexController],
})
export class HanulsePageModule {}

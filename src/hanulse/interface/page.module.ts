import { Module } from '@nestjs/common';
import { HanulseIndexController } from './page/index.controller';
import { HanulseSimpleController } from './page/simple.controller';

@Module({
  // imports: [HanulseServiceModule],
  controllers: [HanulseIndexController, HanulseSimpleController],
})
export class HanulsePageModule {}

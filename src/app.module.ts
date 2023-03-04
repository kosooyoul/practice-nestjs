import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@/global/config/config.module';
import { HanulseModule } from './hanulse/hanulse.module';

@Module({
  imports: [GlobalConfigModule, HanulseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

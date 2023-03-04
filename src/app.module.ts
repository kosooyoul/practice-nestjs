import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@/global/config/config.module';
import { HanulseModule } from './hanulse/hanulse.module';
import { HanulseAdminModule } from './hanulse-admin/hanulse-admin.module';

@Module({
  imports: [GlobalConfigModule, HanulseModule, HanulseAdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@/global/config/config.module';
import { HanulseModule } from '@/hanulse/hanulse.module';
import { HanulseAdminModule } from '@/hanulse-admin/hanulse-admin.module';
import { LoggerModule } from '@/logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const commonModules = [EventEmitterModule.forRoot()];
const featureModules = [GlobalConfigModule, LoggerModule];
const businessFeatureModules = [GlobalConfigModule, HanulseModule, HanulseAdminModule, LoggerModule];

@Module({
  imports: [...commonModules, ...featureModules, ...businessFeatureModules],
  controllers: [],
  providers: [],
})
export class AppModule {}

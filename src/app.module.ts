import { Module } from '@nestjs/common';
import { AuoiConfigModule } from '@/auoi/config/config.module';
import { HanulseModule } from '@/hanulse/hanulse.module';
import { HanulseAdminModule } from '@/hanulse-admin/hanulse-admin.module';
import { LoggerModule } from '@/logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const commonModules = [EventEmitterModule.forRoot()];
const featureModules = [AuoiConfigModule, LoggerModule];
const businessFeatureModules = [AuoiConfigModule, HanulseModule, HanulseAdminModule, LoggerModule];

@Module({
  imports: [...commonModules, ...featureModules, ...businessFeatureModules],
  controllers: [],
  providers: [],
})
export class AppModule {}

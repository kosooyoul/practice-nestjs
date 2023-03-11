import { Module } from '@nestjs/common';
import { HanulseMeController } from './rest/me.controller';
import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { SignController } from './rest/sign.controller';
import { HanulseGroupController } from './rest/group.controller';
import { HanulseClassController } from './rest/class.controller';

@Module({
  imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
  controllers: [HanulseMeController, SignController, HanulseGroupController, HanulseClassController],
})
export class HanulseRestModule {}

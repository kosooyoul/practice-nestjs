import { Module } from '@nestjs/common';
import { AccountController } from './rest/account.controller';
import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { SignController } from './rest/sign.controller';

@Module({
  imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
  controllers: [AccountController, SignController],
})
export class HanulseRestModule {}

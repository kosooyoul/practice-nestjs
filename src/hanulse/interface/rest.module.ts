import { Module } from '@nestjs/common';
import { HanulseMeController } from './rest/me.controller';
import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { HanulseSignController } from './rest/sign.controller';
import { HanulseGroupController } from './rest/group.controller';
import { HanulseClassController } from './rest/class.controller';
import { HanulsePrismaService } from '../infrastructure/prisma/prisma.service';

@Module({
  imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
  controllers: [HanulseMeController, HanulseSignController, HanulseGroupController, HanulseClassController],
  providers: [HanulsePrismaService],
})
export class HanulseRestModule {}

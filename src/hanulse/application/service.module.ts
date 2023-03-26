import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { Module } from '@nestjs/common';
import { HanulseUserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { IRefreshTokenRepository } from '../infrastructure/interface/refresh-token.repository';
import { RefreshTokenMongoRepository } from '../infrastructure/mongo/refresh-token.repository';
import { HanulseSignService } from './service/sign.service';
import { IndexService } from './service/index.service';
import { HanulsePrismaRepository } from '../infrastructure/prisma/prisma.service';

const services = [HanulsePrismaRepository, IndexService, HanulseUserService, HanulseSignService];
const repositories = [HanulsePrismaRepository, { provide: IRefreshTokenRepository, useClass: RefreshTokenMongoRepository }];

@Module({
  imports: [HanulseMongoDatabaseModule, JwtModule],
  providers: [...services, ...repositories],
  exports: services,
})
export class HanulseServiceModule {}

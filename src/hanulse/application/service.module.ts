import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { Module } from '@nestjs/common';
import { IHanulseUserRepository } from '@/hanulse/infrastructure/interface/user.repository';
import { HanulseUserService } from './service/user.service';
import { IHanulseUserMongoRepository } from '@/hanulse/infrastructure/mongo/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { IRefreshTokenRepository } from '../infrastructure/interface/refresh-token.repository';
import { RefreshTokenMongoRepository } from '../infrastructure/mongo/refresh-token.repository';
import { HanulseSignService } from './service/sign.service';
import { IndexService } from './service/index.service';

const services = [IndexService, HanulseUserService, HanulseSignService];
const repositories = [
  { provide: IHanulseUserRepository, useClass: IHanulseUserMongoRepository },
  { provide: IRefreshTokenRepository, useClass: RefreshTokenMongoRepository },
];

@Module({
  imports: [HanulseMongoDatabaseModule, JwtModule],
  providers: [...services, ...repositories],
  exports: services,
})
export class HanulseServiceModule {}

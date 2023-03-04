import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { Module } from '@nestjs/common';
import { IAccountRepository } from '@/hanulse/infrastructure/interface/account.repository';
import { AccountService } from './service/account.service';
import { AccountMongoRepository } from '@/hanulse/infrastructure/mongo/account.repository';
import { JwtModule } from '@nestjs/jwt';
import { IRefreshTokenRepository } from '../infrastructure/interface/refresh-token.repository';
import { RefreshTokenMongoRepository } from '../infrastructure/mongo/refresh-token.repository';
import { AccountSignService } from './service/account-sign.service';
import { IndexService } from './service/index.service';

const services = [IndexService, AccountService, AccountSignService];
const repositories = [
  { provide: IAccountRepository, useClass: AccountMongoRepository },
  { provide: IRefreshTokenRepository, useClass: RefreshTokenMongoRepository },
];

@Module({
  imports: [HanulseMongoDatabaseModule, JwtModule],
  providers: [...services, ...repositories],
  exports: services,
})
export class HanulseServiceModule {}

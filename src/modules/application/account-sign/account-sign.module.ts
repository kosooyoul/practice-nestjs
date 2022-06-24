import { Module } from '@nestjs/common';
import { AccountSignService } from './account-sign.service';
import { AppDatabaseModule } from '@/modules/infrastructure/database/app-database.module';
import { JwtModule } from '@nestjs/jwt';
import { IRefreshTokenRepository } from '@/modules/domain/refresh-token/refresh-token.repository';
import { RefreshTokenMongoRepository } from '@/modules/infrastructure/database/refresh-token.mongo.repository';

@Module({
  imports: [AppDatabaseModule, JwtModule],
  providers: [
    AccountSignService,
    { provide: IRefreshTokenRepository, useClass: RefreshTokenMongoRepository },
  ],
  exports: [AccountSignService],
})
export class AccountSignModule {}

import { AppDatabaseModule } from '@/modules/infrastructure/database/app-database.module';
import { Module } from '@nestjs/common';
import { IAccountRepository } from '@/modules/domain/account/account.repository';
import { AccountService } from './account.service';
import { AccountMongoRepository } from '@/modules/infrastructure/database/account.mongo.repository';

@Module({
  imports: [AppDatabaseModule],
  providers: [
    AccountService,
    { provide: IAccountRepository, useClass: AccountMongoRepository },
  ],
  exports: [AccountService],
})
export class AccountModule {}

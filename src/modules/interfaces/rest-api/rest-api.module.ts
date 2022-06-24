import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountModule } from '@/modules/application/account/account.module';
import { AppDatabaseModule } from '@/modules/infrastructure/database/app-database.module';
import { AccountSignModule } from '@/modules/application/account-sign/account-sign.module';
import { AccountSignController } from './account-sign.controller';

@Module({
  imports: [AppDatabaseModule, AccountModule, AccountSignModule],
  controllers: [AccountController, AccountSignController],
})
export class RestApiModule {}

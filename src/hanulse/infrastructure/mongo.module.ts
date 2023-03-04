import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Account } from '@/hanulse/domain/account.entity';
import { RefreshToken } from '@/hanulse/domain/refresh-token.entity';

const models = TypegooseModule.forFeature([Account, RefreshToken], 'HanulseDatabase');

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      connectionName: 'HanulseDatabase',
      useFactory: async () => ({ uri: process.env.DB_HOST }),
    }),
    models,
  ],
  exports: [models],
})
export class HanulseMongoDatabaseModule {}

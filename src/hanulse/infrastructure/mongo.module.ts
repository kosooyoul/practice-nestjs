import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { RefreshToken } from '@/hanulse/domain/refresh-token.entity';
import { HanulseClass } from '../domain/class.entity';
import { HanulseGroupUser } from '../domain/group-user.entity';
import { HanulseGroup } from '../domain/group.entity';
import { HanulseStudent } from '../domain/student.entity';
import { HanulseUser } from '../domain/user.entity';

const models = TypegooseModule.forFeature([RefreshToken, HanulseUser, HanulseGroup, HanulseGroupUser, HanulseClass, HanulseStudent], 'HanulseDatabase');

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

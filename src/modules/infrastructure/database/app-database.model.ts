import { TypegooseModule } from 'nestjs-typegoose';
import Account from '@/modules/domain/account/account.entity';
import RefreshToken from '@/modules/domain/refresh-token/refresh-token.entity';

export const AppMainDatabaseModel = TypegooseModule.forFeature(
  [Account, RefreshToken],
  'AppDatabase',
);

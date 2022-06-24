import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppMainDatabaseModel } from './app-database.model';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      connectionName: 'AppDatabase',
      useFactory: async () => ({ uri: process.env.DB_HOST }),
    }),
    AppMainDatabaseModel,
  ],
  exports: [AppMainDatabaseModel],
})
export class AppDatabaseModule {}

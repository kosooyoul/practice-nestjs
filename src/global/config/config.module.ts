import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalConfig } from './config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${GlobalConfig.NODE_ENV}`,
    }),
  ],
})
export class GlobalConfigModule {}

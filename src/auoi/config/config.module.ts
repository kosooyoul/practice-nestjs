import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuoiConfig } from './config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${AuoiConfig.NODE_ENV}`,
    }),
  ],
})
export class AuoiConfigModule {}

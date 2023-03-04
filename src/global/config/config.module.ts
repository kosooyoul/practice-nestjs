import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const env = process.env.NODE_ENV?.toLowerCase() || 'local';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${env}`,
    }),
  ],
})
export class GlobalConfigModule {
  // Do nothing
}

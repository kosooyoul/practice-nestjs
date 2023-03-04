import { Module } from '@nestjs/common';
import { GlobalConfigModule } from '@/global/config/config.module';
import { AuthModule } from '@/global/auth/auth.module';
import { GraphQLApiModule } from './modules/interfaces/graphql-api/graphql-api.module';
import { RestApiModule } from './modules/interfaces/rest-api/rest-api.module';
import { PageModule } from './modules/interfaces/page/page.module';

@Module({
  imports: [
    GlobalConfigModule,
    AuthModule,
    GraphQLApiModule,
    RestApiModule,
    PageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

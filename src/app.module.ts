import { Module } from '@nestjs/common';
import { AppConfigModule } from './accessory/config/config.module';
import { AuthModule } from './accessory/auth/auth.module';
import { GraphQLApiModule } from './modules/interfaces/graphql-api/graphql-api.module';
import { RestApiModule } from './modules/interfaces/rest-api/rest-api.module';
import { PageModule } from './modules/interfaces/page/page.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    GraphQLApiModule,
    RestApiModule,
    PageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

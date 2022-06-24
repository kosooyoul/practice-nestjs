import { AccountSignResolver } from './account-sign.resolver';
import { AccountSignModule } from '@/modules/application/account-sign/account-sign.module';
import { AccountModule } from '@/modules/application/account/account.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppDatabaseModule } from '@/modules/infrastructure/database/app-database.module';

@Module({
  imports: [
    AppDatabaseModule,
    AppDatabaseModule,
    AccountModule,
    AccountSignModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [],
      useFactory: () => ({
        uploads: false,
        cors: true,
        validate: true,
        playground: true,
        autoSchemaFile: true,
        debug: true,
        disableHealthCheck: true,
        path: 'gql',
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
  ],
  providers: [AccountResolver, AccountSignResolver],
})
export class GraphQLApiModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer) {
    // Note: Add middleware
  }
}

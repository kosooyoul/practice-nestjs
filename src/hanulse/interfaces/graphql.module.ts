import { SignResolver } from './graphql/sign.resolver';
import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AccountResolver } from './graphql/account.resolver';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';

@Module({
  imports: [
    HanulseMongoDatabaseModule,
    HanulseServiceModule,
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
        path: '/v0/graphql',
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
  ],
  providers: [AccountResolver, SignResolver],
})
export class HanulseGraphQLModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer) {
    // Note: Add middleware
  }
}

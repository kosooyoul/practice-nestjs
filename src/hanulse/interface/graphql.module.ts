import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { Module } from '@nestjs/common';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { AuoiGraphQLModule } from '@/global/interface/graphql/graphql.module';
import { AccountResolver } from './graphql/account.resolver';
import { SignResolver } from './graphql/sign.resolver';

export const HanulseGraphQLResolvers = [AccountResolver, SignResolver];

@Module({
  imports: [
    AuoiGraphQLModule.forRootAsync({
      path: '/v0/graphql',
      module: HanulseGraphQLModule,
      imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
      providers: [],
      resolvers: HanulseGraphQLResolvers,
    }),
  ],
})
export class HanulseGraphQLModule {}

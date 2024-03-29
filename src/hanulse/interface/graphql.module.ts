import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { Module } from '@nestjs/common';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { AuoiGraphQLModule } from '@/auoi/interface/graphql/graphql.module';
import { HanulseMeResolver } from './graphql/me.resolver';
import { HanulseSignResolver } from './graphql/sign.resolver';

export const HanulseGraphQLResolvers = [HanulseMeResolver, HanulseSignResolver];

@Module({
  imports: [
    AuoiGraphQLModule.forRootAsync({
      path: '/v0/graphql',
      module: HanulseGraphQLModule,
      imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
      resolvers: HanulseGraphQLResolvers,
    }),
  ],
})
export class HanulseGraphQLModule {}

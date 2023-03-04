import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { Module } from '@nestjs/common';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { DefaultGraphQLModule } from '@/global/interface/graphql/graphql.module';
import { AccountResolver } from './graphql/account.resolver';
import { SignResolver } from './graphql/sign.resolver';

export const HanulseGraphQLResolvers = [AccountResolver, SignResolver];

@Module({
  imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
  providers: HanulseGraphQLResolvers,
})
export class HanulseGraphQLSchemaModule {}

@Module({
  imports: [DefaultGraphQLModule('hanulse', '/v0/user/graphql', HanulseGraphQLSchemaModule)],
})
export class HanulseGraphQLModule {}

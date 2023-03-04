import { HanulseServiceModule } from '@/hanulse/application/service.module';
import { Module } from '@nestjs/common';
import { HanulseMongoDatabaseModule } from '@/hanulse/infrastructure/mongo.module';
import { DefaultGraphQLModule } from '@/global/interface/graphql/graphql.module';
import { AccountResolver } from './graphql/account.resolver';
import { SignResolver } from './graphql/sign.resolver';

@Module({
  imports: [HanulseMongoDatabaseModule, HanulseServiceModule],
  providers: [AccountResolver, SignResolver],
})
export class HanulseGraphQLSchemaModule {}

@Module({
  imports: [
    HanulseGraphQLSchemaModule,
    DefaultGraphQLModule('/v0/graphql', HanulseGraphQLSchemaModule),
  ],
})
export class HanulseGraphQLModule {}

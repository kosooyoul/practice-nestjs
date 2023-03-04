import { Module } from '@nestjs/common';
import { DefaultGraphQLModule } from '@/global/interface/graphql/graphql.module';
import { TestResolver } from './graphql/test.resolver';

export const HanulseAdminGraphQLResolvers = [TestResolver];

@Module({
  providers: HanulseAdminGraphQLResolvers,
})
export class HanulseAdminGraphQLSchemaModule {}

@Module({
  imports: [DefaultGraphQLModule('hanulse-admin', '/v0/admin/graphql', HanulseAdminGraphQLSchemaModule)],
})
export class HanulseAdminGraphQLModule {}

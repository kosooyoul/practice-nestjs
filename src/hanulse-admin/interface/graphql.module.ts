import { Module } from '@nestjs/common';
import { DefaultGraphQLModule } from '@/global/interface/graphql/graphql.module';
import { TestResolver } from './graphql/test.resolver';

export const HanulseAdminGraphQLResolvers = [TestResolver];

@Module({
  providers: HanulseAdminGraphQLResolvers,
})
export class HanulseAdminGraphQLSchemaModule {}

@Module({
  imports: [
    DefaultGraphQLModule({
      path: '/v0/admin/graphql',
      module: HanulseAdminGraphQLSchemaModule,
      resolvers: HanulseAdminGraphQLResolvers,
    }),
  ],
})
export class HanulseAdminGraphQLModule {}

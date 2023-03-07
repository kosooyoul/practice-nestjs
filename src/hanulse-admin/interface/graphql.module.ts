import { Module } from '@nestjs/common';
import { AuoiGraphQLModule } from '@/global/interface/graphql/graphql.module';
import { TestResolver } from './graphql/test.resolver';

export const HanulseAdminGraphQLResolvers = [TestResolver];

@Module({
  imports: [
    AuoiGraphQLModule.forRootAsync({
      path: '/v0/admin/graphql',
      module: HanulseAdminGraphQLModule,
      imports: [],
      providers: [],
      resolvers: HanulseAdminGraphQLResolvers,
    }),
  ],
})
export class HanulseAdminGraphQLModule {}

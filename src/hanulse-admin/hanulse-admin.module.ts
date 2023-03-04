import { Module } from '@nestjs/common';
import { HanulseAdminGraphQLModule } from './interface/graphql.module';

@Module({
  imports: [HanulseAdminGraphQLModule],
  controllers: [],
  providers: [],
})
export class HanulseAdminModule {}

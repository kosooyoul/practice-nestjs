import { Module } from '@nestjs/common';
import { HanulseAdminGraphQLModule } from './interfaces/graphql.module';

@Module({
  imports: [HanulseAdminGraphQLModule],
  controllers: [],
  providers: [],
})
export class HanulseAdminModule {}

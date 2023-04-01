import { Module } from '@nestjs/common';
import { HanulseGraphQLModule } from './interface/graphql.module';
import { HanulseRestModule } from './interface/rest.module';
import { HanulsePageModule } from './interface/page.module';

@Module({
  imports: [HanulseGraphQLModule, HanulseRestModule, HanulsePageModule],
  controllers: [],
  providers: [],
})
export class HanulseModule {}

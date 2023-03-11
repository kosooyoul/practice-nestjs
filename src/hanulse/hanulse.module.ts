import { Module } from '@nestjs/common';
import { AuthModule } from '@/auoi/auth/auth.module';
import { HanulseGraphQLModule } from './interface/graphql.module';
import { HanulseRestModule } from './interface/rest.module';
import { HanulsePageModule } from './interface/page.module';

@Module({
  imports: [AuthModule, HanulseGraphQLModule, HanulseRestModule, HanulsePageModule],
  controllers: [],
  providers: [],
})
export class HanulseModule {}

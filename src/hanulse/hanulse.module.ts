import { Module } from '@nestjs/common';
import { AuthModule } from '@/global/auth/auth.module';
import { HanulseGraphQLModule } from './interfaces/graphql.module';
import { HanulseRestModule } from './interfaces/rest.module';
import { HanulsePageModule } from './interfaces/page.module';

@Module({
  imports: [
    AuthModule,
    HanulseGraphQLModule,
    HanulseRestModule,
    HanulsePageModule,
  ],
  controllers: [],
  providers: [],
})
export class HanulseModule {}

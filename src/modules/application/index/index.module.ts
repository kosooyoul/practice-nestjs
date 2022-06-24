import { Module } from '@nestjs/common';
import { IndexService } from './index.service';

@Module({
  imports: [],
  controllers: [],
  providers: [IndexService],
  exports: [IndexService],
})
export class IndexModule {}

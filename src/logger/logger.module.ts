import { Module } from '@nestjs/common';
import { LoggerHttpLoggerModule } from './interface/http/http-logger.module';

@Module({
  imports: [LoggerHttpLoggerModule],
})
export class LoggerModule {}

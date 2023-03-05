import { HttpLoggerMiddleware } from '../../common/http-logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({})
export class LoggerHttpLoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}

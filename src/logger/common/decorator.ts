import { OnEvent } from '@nestjs/event-emitter';

export const OnLoggerApiLogEvent = function (): MethodDecorator {
  return OnEvent('logger/api-log');
};

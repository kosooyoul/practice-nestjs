import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { AuoiRestApiResponse } from './types';

export class AuoiRestApiResponseInterceptor implements NestInterceptor {
  async intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(async data => AuoiRestApiResponse(data)),
      catchError(async err => AuoiRestApiResponse(err)),
    );
  }
}

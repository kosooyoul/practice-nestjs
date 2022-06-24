import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { ApiResponse } from '@/common/types';

export class ApiResponseInterceptor implements NestInterceptor {
  async intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(async (data) => ApiResponse(data)),
      catchError(async (err) => ApiResponse(err)),
    );
  }
}

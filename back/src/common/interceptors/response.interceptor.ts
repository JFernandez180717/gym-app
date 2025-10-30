import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../response/api-response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ApiResponse.success(data)),
      catchError((err) => throwError(() => err)),
    );
  }
}

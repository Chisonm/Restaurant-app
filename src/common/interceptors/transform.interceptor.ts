import { 
    Injectable, 
    NestInterceptor, 
    ExecutionContext, 
    CallHandler 
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface Response<T> {
    data: T;
    meta?: Record<string, any>;
  }
  
  @Injectable()
  export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
      return next.handle().pipe(
        map(data => {
          // If data is already structured with data and meta, return as is
          if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
            return data;
          }
          
          // Assume response is paginated if it has these properties
          if (data && typeof data === 'object' && 'items' in data && 'total' in data) {
            return {
              data: data.items,
              meta: {
                total: data.total,
                page: data.page,
                limit: data.limit,
                totalPages: Math.ceil(data.total / data.limit),
              },
            };
          }
          
          // Regular response
          return { data };
        }),
      );
    }
  }
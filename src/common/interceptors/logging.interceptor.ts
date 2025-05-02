import { 
    Injectable, 
    NestInterceptor, 
    ExecutionContext, 
    CallHandler, 
    Logger 
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const { method, url, body, user } = req;
      const userRole = user?.role || 'unauthenticated';
      const userId = user?.id || 'unknown';
  
      this.logger.log(`[${method}] ${url} - User:${userId} Role:${userRole}`);
      
      const now = Date.now();
      return next.handle().pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          this.logger.log(`[${method}] ${url} - ${responseTime}ms`);
        }),
      );
    }
  }
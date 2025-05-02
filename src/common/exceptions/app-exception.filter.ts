import { 
    ExceptionFilter, 
    Catch, 
    ArgumentsHost, 
    HttpException, 
    HttpStatus, 
    Logger 
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      
      const status = 
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      
      const message = 
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error';
  
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: message,
      };
  
      // Log all non-404 errors
      if (status !== HttpStatus.NOT_FOUND) {
        this.logger.error(
          `[${request.method}] ${request.url}`,
          exception instanceof Error ? exception.stack : JSON.stringify(exception),
          `Request body: ${JSON.stringify(request.body) || 'No body'}`
        );
      }
  
      response.status(status).json(errorResponse);
    }
  }
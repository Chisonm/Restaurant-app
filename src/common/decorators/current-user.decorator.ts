import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    if (!request.user) {
      throw new InternalServerErrorException('User not found in request (ensure AuthGuard is used)');
    }
    
    return data ? request.user?.[data] : request.user;
  },
);
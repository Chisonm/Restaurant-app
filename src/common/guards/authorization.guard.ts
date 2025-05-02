import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException, 
    Logger 
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { POLICY_KEY } from '../decorators/policy.decorator';
  import { PolicyHandler } from '../interfaces/policy-handler.interface';
  
  @Injectable()
  export class AuthorizationGuard implements CanActivate {
    private readonly logger = new Logger(AuthorizationGuard.name);
  
    constructor(private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const policyHandlers = this.reflector.get<PolicyHandler[]>(
        POLICY_KEY,
        context.getHandler(),
      ) || [];
  
      if (policyHandlers.length === 0) {
        return true; // No policy handlers, allow access
      }
  
      const { user } = context.switchToHttp().getRequest();
      if (!user) {
        this.logger.warn('No user found in request when policy handlers are present');
        return false;
      }
  
      // Check if at least one policy allows the user
      const results = await Promise.all(
        policyHandlers.map(handler => {
          if (typeof handler === 'function') {
            return handler(user);
          }
          return handler.handle(user);
        }),
      );
  
      if (!results.some(result => result)) {
        const handlerName = context.getHandler().name;
        const className = context.getClass().name;
        this.logger.warn(
          `User ${user.id} with role ${user.role} denied access to ${className}.${handlerName}`
        );
        throw new ForbiddenException('You do not have sufficient permissions for this action');
      }
  
      return true;
    }
  }
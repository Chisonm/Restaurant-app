import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../interfaces/policy-handler.interface';

export const POLICY_KEY = 'policy_key';
export const Policy = (...handlers: PolicyHandler[]) => SetMetadata(POLICY_KEY, handlers);
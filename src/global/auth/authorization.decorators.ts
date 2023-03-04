import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Authorization = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const authorization = ctx.getContext().req.headers.authorization;
    return authorization && authorization.replace(/^Bearer\s+/, '');
  },
);

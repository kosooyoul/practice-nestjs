import { ObjectId } from '@/common/types/mongo';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Signature = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return {
    ...ctx.getContext().req.user,
    id: ObjectId(ctx.getContext().req.user.id),
  };
});

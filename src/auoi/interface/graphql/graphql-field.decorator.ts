import { Field } from '@nestjs/graphql';
import { getReturnTypeFunc, IAuoiApiPropertyOptions } from '../common/types';

export const AuoiGraphQLField = function (options: IAuoiApiPropertyOptions): PropertyDecorator {
  return Field(options.type && getReturnTypeFunc(options.type), {
    description: options.description,
    nullable: options.nullable,
    defaultValue: options.defaultValue,
  });
};

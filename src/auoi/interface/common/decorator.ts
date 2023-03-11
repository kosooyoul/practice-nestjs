import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@nestjs/graphql';
import AuoiDecoratorUtils from '@/auoi/common/utils/decorator.util';

interface IAuoiApiPropertyOptions {
  type: any;
  description?: string;
  nullable?: boolean;
  defaultValue?: any;
  example?: any;
}

export const getReturnTypeFunc = (returnType: any) => () => returnType;

export const AuoiRestApiField = function (options: IAuoiApiPropertyOptions): PropertyDecorator {
  return ApiProperty({
    // type: options.type,
    description: options.description,
    required: !options.nullable,
    example: options.example,
  });
};

export const AuoiGraphQLField = function (options: IAuoiApiPropertyOptions): PropertyDecorator {
  return Field(options.type && getReturnTypeFunc(options.type), {
    description: options.description,
    nullable: options.nullable,
    defaultValue: options.defaultValue,
  });
};

export const AuoiApiField = function (options: IAuoiApiPropertyOptions): PropertyDecorator {
  return AuoiDecoratorUtils.combinePropertyDecorator(AuoiRestApiField(options), AuoiGraphQLField(options));
};

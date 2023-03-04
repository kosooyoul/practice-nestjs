import { Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponseInterceptor as ApiResponseInterceptor } from './response.interceptor';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Field } from '@nestjs/graphql';
import { Optional } from '@/global/common/types';

interface IApiOptions {
  path: string | string[];
  description?: string;
  auth?: boolean;
}

interface IApiPropertyOptions {
  description?: string;
  nullable?: boolean;
  defaultValue?: any;
  example?: string;
}

function combinePropertyDecorator(
  ...decorators: PropertyDecorator[]
): PropertyDecorator {
  return function (target: any, key: string) {
    let decorator: Optional<PropertyDecorator>;
    while ((decorator = decorators.shift())) decorator(target, key);
  } as PropertyDecorator;
}

function combineMethodDecorator(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return function (target: any, key: string, descriptor: any) {
    let decorator: Optional<MethodDecorator>;
    while ((decorator = decorators.shift())) decorator(target, key, descriptor);
  } as MethodDecorator;
}

export const GetApi = function (
  returnTypeFunc?: (returns?: void) => any,
  options?: IApiOptions,
): MethodDecorator {
  if (options.auth) {
    return combineMethodDecorator(
      ApiBearerAuth('access-token'),
      Get(options?.path),
      UseInterceptors(ApiResponseInterceptor),
      ApiOperation({ summary: options?.description }),
      ApiCreatedResponse({
        description: options?.description,
        type: returnTypeFunc(),
      }),
    );
  } else {
    return combineMethodDecorator(
      Get(options?.path),
      UseInterceptors(ApiResponseInterceptor),
      ApiOperation({ summary: options?.description }),
      ApiCreatedResponse({
        description: options?.description,
        type: returnTypeFunc(),
      }),
    );
  }
};

export const PostApi = function (
  returnTypeFunc?: (returns?: void) => any,
  options?: IApiOptions,
): MethodDecorator {
  if (options.auth) {
    return combineMethodDecorator(
      ApiBearerAuth('access-token'),
      Post(options?.path),
      UseInterceptors(ApiResponseInterceptor),
      ApiOperation({ summary: options?.description }),
      ApiCreatedResponse({
        description: options?.description,
        type: returnTypeFunc(),
      }),
    );
  } else {
    return combineMethodDecorator(
      Post(options?.path),
      UseInterceptors(ApiResponseInterceptor),
      ApiOperation({ summary: options?.description }),
      ApiCreatedResponse({
        description: options?.description,
        type: returnTypeFunc(),
      }),
    );
  }
};

export const ApiField = function (
  returnTypeFunc?: (returns?: void) => any,
  options?: IApiPropertyOptions,
): PropertyDecorator {
  return combinePropertyDecorator(
    ApiProperty({
      description: options?.description,
      required: options ? !options.nullable : undefined,
      example: options.example,
    }),
    Field(returnTypeFunc, {
      description: options?.description,
      nullable: options?.nullable,
      defaultValue: options?.defaultValue,
    }),
  );
};

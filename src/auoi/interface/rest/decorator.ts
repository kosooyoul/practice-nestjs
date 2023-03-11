import { All, Delete, Get, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { AuoiRestApiResponseInterceptor } from './interceptor';
import { ApiBearerAuth, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import AuoiDecoratorUtils from '@/auoi/common/utils/decorator.util';

interface IAuoiRestApiOptions {
  path: string | string[];
  description?: string;
  auth?: boolean;
}

export const getRestApiDecorator = function (
  methodDecorator: (path?: string | string[]) => MethodDecorator,
  returnTypeFunc?: (returns?: void) => any,
  options?: IAuoiRestApiOptions,
): MethodDecorator {
  if (options.auth) {
    return AuoiDecoratorUtils.combineMethodDecorator(
      ApiBearerAuth('access-token'),
      methodDecorator(options?.path),
      UseInterceptors(AuoiRestApiResponseInterceptor),
      ApiOperation({ summary: options?.description }),
      ApiCreatedResponse({ description: options?.description, type: returnTypeFunc() }),
    );
  } else {
    return AuoiDecoratorUtils.combineMethodDecorator(
      methodDecorator(options?.path),
      UseInterceptors(AuoiRestApiResponseInterceptor),
      ApiOperation({ summary: options?.description }),
      ApiCreatedResponse({ description: options?.description, type: returnTypeFunc() }),
    );
  }
};

export const AuoiAllApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(All, returnTypeFunc, options);
};

export const AuoiGetApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Get, returnTypeFunc, options);
};

export const AuoiPostApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Post, returnTypeFunc, options);
};

export const AuoiPatchApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Patch, returnTypeFunc, options);
};

export const AuoiPutApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Put, returnTypeFunc, options);
};

export const AuoiDeleteApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Delete, returnTypeFunc, options);
};

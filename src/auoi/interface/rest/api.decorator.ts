import { All, Delete, Get, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { AuoiRestApiResponseInterceptor } from './interceptor';
import { ApiBearerAuth, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import AuoiDecoratorUtils from '@/auoi/common/utils/decorator.util';

interface IAuoiRestApiOptions {
  path: string | string[];
  description?: string;
  auth?: boolean;
}

const getRestApiDecorator = function (
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

export const AuoiRestApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(All, returnTypeFunc, options);
};

export const AuoiRestGetApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Get, returnTypeFunc, options);
};

export const AuoiRestPostApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Post, returnTypeFunc, options);
};

export const AuoiRestPatchApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Patch, returnTypeFunc, options);
};

export const AuoiRestPutApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Put, returnTypeFunc, options);
};

export const AuoiRestDeleteApi = function (returnTypeFunc?: (returns?: void) => any, options?: IAuoiRestApiOptions): MethodDecorator {
  return getRestApiDecorator(Delete, returnTypeFunc, options);
};

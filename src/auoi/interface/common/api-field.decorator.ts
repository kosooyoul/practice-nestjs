import AuoiDecoratorUtils from '@/auoi/common/utils/decorator.util';
import { IAuoiApiPropertyOptions } from './types';
import { AuoiGraphQLField } from '../graphql/graphql-field.decorator';
import { AuoiRestApiField } from '../rest/rest-api.decorator';

export const AuoiApiField = function (options: IAuoiApiPropertyOptions): PropertyDecorator {
  return AuoiDecoratorUtils.combinePropertyDecorator(AuoiRestApiField(options), AuoiGraphQLField(options));
};

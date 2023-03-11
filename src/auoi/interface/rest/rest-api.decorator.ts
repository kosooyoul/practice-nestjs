import { ApiProperty } from '@nestjs/swagger';
import { IAuoiApiPropertyOptions } from '../common/types';

export const AuoiRestApiField = function (options: IAuoiApiPropertyOptions): PropertyDecorator {
  return ApiProperty({
    // type: options.type,
    description: options.description,
    required: !options.nullable,
    example: options.example,
  });
};

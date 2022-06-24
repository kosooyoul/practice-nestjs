import { InputType } from '@nestjs/graphql';
import InputValidator from '@/accessory/input-validator/input-validator.decorator';
import InputTransformer from '@/accessory/input-transformer/input-transformer.decorator';
import { ApiField } from '@/accessory/rest-api/api.decorator';

@InputType()
export default class RefreshSignRequest {
  @InputTransformer.Trim()
  @InputValidator.IsNotEmptyString()
  @ApiField(() => String, {
    description: '인증 리프레시 토큰',
    nullable: false,
    example: 'qwertyuiopasdfghjklzxcvbnm',
  })
  refreshToken!: string;
}

import { InputType } from '@nestjs/graphql';
import { AuoiInputValidator } from '@/global/common/decorators/input-validator.decorator';
import { AuoiInputTransformer } from '@/global/common/decorators/input-transformer.decorator';
import { AuoiApiField } from '@/global/interface/common/decorator';

@InputType()
export default class RefreshSignRequest {
  @AuoiInputTransformer.Trim()
  @AuoiInputValidator.IsNotEmptyString()
  @AuoiApiField({
    type: String,
    description: '인증 리프레시 토큰',
    nullable: false,
    example: 'qwertyuiopasdfghjklzxcvbnm',
  })
  refreshToken!: string;
}

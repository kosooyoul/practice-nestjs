import { InputType } from '@nestjs/graphql';
import { AuoiInputValidator } from '@/auoi/common/decorators/input-validator.decorator';
import { AuoiInputTransformer } from '@/auoi/common/decorators/input-transformer.decorator';
import { AuoiApiField } from '@/auoi/interface/common/api-field.decorator';

@InputType()
export default class HanulseRefreshSignRequest {
  @AuoiInputTransformer.Trim()
  @AuoiInputValidator.IsNotEmptyString()
  @AuoiApiField({ type: String, description: '갱신 토큰', nullable: false, example: 'qwertyuiopasdfghjklzxcvbnm' })
  refreshToken!: string;
}

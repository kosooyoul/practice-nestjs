import { InputType } from '@nestjs/graphql';
import { GlobalInputValidator } from '@/global/common/decorators/input-validator.decorator';
import { GlobalInputTransformer } from '@/global/common/decorators/input-transformer.decorator';
import { ApiField } from '@/global/interface/rest/decorator';

@InputType()
export default class RefreshSignRequest {
  @GlobalInputTransformer.Trim()
  @GlobalInputValidator.IsNotEmptyString()
  @ApiField(() => String, {
    description: '인증 리프레시 토큰',
    nullable: false,
    example: 'qwertyuiopasdfghjklzxcvbnm',
  })
  refreshToken!: string;
}

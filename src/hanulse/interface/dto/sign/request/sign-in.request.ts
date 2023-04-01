import { InputType } from '@nestjs/graphql';
import { AuoiInputValidator } from '@/auoi/common/decorators/input-validator.decorator';
import { IHanulseUserFilter } from '@/hanulse/application/dto/user/user-filter';
import { AuoiApiField } from '@/auoi/interface/common/api-field.decorator';

@InputType()
export default class HanulseSignInRequest {
  @AuoiApiField({ type: String, description: '사용자 식별 값', nullable: false, example: '010-0000-0000' })
  identity!: string;

  @AuoiInputValidator.IsNotEmptyString()
  @AuoiApiField({ type: String, description: '사용자 암호', nullable: false, example: 'a123456!' })
  password?: string;

  toUserFilter(): IHanulseUserFilter {
    return {
      identity: this.identity,
    };
  }
}

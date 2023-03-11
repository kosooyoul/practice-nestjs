import { InputType } from '@nestjs/graphql';
import { AuoiInputValidator } from '@/auoi/common/decorators/input-validator.decorator';
import { IHanulseUserFilter } from '@/hanulse/application/dto/user/user-filter';
import { AuoiApiField } from '@/auoi/interface/common/decorator';

@InputType()
export default class SignInRequest {
  @AuoiApiField({ type: String, description: '사용자 휴대 전화 번호', nullable: false, example: '010-0000-0000' })
  cellPhoneNumber!: string;

  @AuoiInputValidator.IsNotEmptyString()
  @AuoiApiField({ type: String, description: '사용자 암호', nullable: false, example: 'a123456!' })
  password!: string;

  @AuoiApiField({ type: Boolean, description: '로그인 유지 여부', nullable: true, defaultValue: false, example: 'true' })
  keep!: boolean;

  toUserFilter(): IHanulseUserFilter {
    return {
      cellPhoneNumber: this.cellPhoneNumber,
    };
  }
}

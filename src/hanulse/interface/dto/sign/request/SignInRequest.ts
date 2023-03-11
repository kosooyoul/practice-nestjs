import { InputType } from '@nestjs/graphql';
import { AuoiInputValidator } from '@/auoi/common/decorators/input-validator.decorator';
import { AuoiInputTransformer } from '@/auoi/common/decorators/input-transformer.decorator';
import { IAccountFilter } from '@/hanulse/application/dto/account/account-filter';
import { AuoiApiField } from '@/auoi/interface/common/decorator';

@InputType()
export default class SignInRequest {
  @AuoiInputTransformer.NormalizeEmail()
  @AuoiInputValidator.IsEmail()
  @AuoiApiField({ type: String, description: '로그인 이메일', nullable: false, example: 'test@test.com' })
  email!: string;

  @AuoiInputValidator.IsNotEmptyString()
  @AuoiApiField({ type: String, description: '로그인 비밀번호', nullable: false, example: 'a123456!' })
  password!: string;

  @AuoiApiField({ type: Boolean, description: '로그인을 유지할지 여부', nullable: true, defaultValue: false, example: 'true' })
  keep!: boolean;

  toAccountFilter(): IAccountFilter {
    return {
      email: this.email,
    };
  }
}

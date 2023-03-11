import { InputType } from '@nestjs/graphql';
import { AuoiInputValidator } from '@/auoi/common/decorators/input-validator.decorator';
import { AuoiInputTransformer } from '@/auoi/common/decorators/input-transformer.decorator';
import { IHanulseUserFields } from '@/hanulse/application/dto/user/user-fields';
import { AuoiApiField } from '@/auoi/interface/common/decorator';
import * as bcrypt from 'bcrypt';

@InputType()
export default class SignUpRequest {
  @AuoiInputTransformer.Trim()
  @AuoiInputValidator.IsUserName()
  @AuoiApiField({ type: String, description: '사용자 이름', nullable: false, example: '테스트' })
  name!: string;

  @AuoiInputTransformer.Trim()
  @AuoiApiField({ type: String, description: '사용자 휴대 전화 번호', nullable: false, example: '010-0000-0000' })
  cellPhoneNumber!: string;

  @AuoiInputValidator.IsPassword()
  @AuoiApiField({ type: String, description: '사용자 암호', nullable: false, example: 'a123456!' })
  password!: string;

  toUserFields(): IHanulseUserFields {
    return {
      name: this.name,
      cellPhoneNumber: this.cellPhoneNumber,
      hashedPassword: this.encryptPassword(this.password),
    };
  }

  private encryptPassword(password: string): string {
    // bcrypt.genSaltSync(SignUtils.SALT_ROUND, SignUtils.SALT_MINOR)
    return bcrypt.hashSync(password, 8);
  }
}

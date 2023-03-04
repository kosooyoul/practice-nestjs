import { InputType } from '@nestjs/graphql';
import { GlobalInputValidator } from '@/global/common/decorators/input-validator.decorator';
import { GlobalInputTransformer } from '@/global/common/decorators/input-transformer.decorator';
import { IAccountFields } from '@/hanulse/application/dto/account/account-fields';
import { ApiField } from '@/global/interface/rest/decorator';
import * as bcrypt from 'bcrypt';

@InputType()
export default class SignUpRequest {
  @GlobalInputTransformer.NormalizeEmail()
  @GlobalInputValidator.IsEmail()
  @ApiField({
    type: String,
    description: '로그인 이메일',
    nullable: false,
    example: 'test@test.com',
  })
  email!: string;

  @GlobalInputValidator.IsPassword()
  @ApiField({
    type: String,
    description: '로그인 비밀번호',
    nullable: false,
    example: 'a123456!',
  })
  password!: string;

  @GlobalInputTransformer.Trim()
  @GlobalInputValidator.IsUserName()
  @ApiField({
    type: String,
    description: '계정 사용자 이름',
    nullable: false,
    example: '테스트',
  })
  username!: string;

  toAccountFields(): IAccountFields {
    return {
      email: this.email,
      password: this.encryptPassword(this.password),
      username: this.username,
    };
  }

  private encryptPassword(password: string): string {
    // bcrypt.genSaltSync(SignUtils.SALT_ROUND, SignUtils.SALT_MINOR)
    return bcrypt.hashSync(password, 8);
  }
}

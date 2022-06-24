import { InputType } from '@nestjs/graphql';
import InputValidator from '@/accessory/input-validator/input-validator.decorator';
import InputTransformer from '@/accessory/input-transformer/input-transformer.decorator';
import { AccountFields } from '@/modules/application/account/account-fields.class';
import { ApiField } from '@/accessory/rest-api/api.decorator';
import * as bcrypt from 'bcrypt';

@InputType()
export default class SignUpRequest {
  @InputTransformer.NormalizeEmail()
  @InputValidator.IsEmail()
  @ApiField(() => String, {
    description: '로그인 이메일',
    nullable: false,
    example: 'test@test.com',
  })
  email!: string;

  @InputValidator.IsPassword()
  @ApiField(() => String, {
    description: '로그인 비밀번호',
    nullable: false,
    example: 'a123456!',
  })
  password!: string;

  @InputTransformer.Trim()
  @InputValidator.IsUserName()
  @ApiField(() => String, {
    description: '계정 사용자 이름',
    nullable: false,
    example: '테스트',
  })
  username!: string;

  toAccountFields(): AccountFields {
    const fields = new AccountFields();
    fields.email = this.email;
    fields.password = this.encryptPassword(this.password);
    fields.username = this.username;
    return fields;
  }

  private encryptPassword(password: string): string {
    // bcrypt.genSaltSync(SignUtils.SALT_ROUND, SignUtils.SALT_MINOR)
    return bcrypt.hashSync(password, 8);
  }
}

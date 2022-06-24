import { InputType } from '@nestjs/graphql';
import InputValidator from '@/accessory/input-validator/input-validator.decorator';
import InputTransformer from '@/accessory/input-transformer/input-transformer.decorator';
import { AccountFilter } from '@/modules/application/account/account-filter.class';
import { ApiField } from '@/accessory/rest-api/api.decorator';

@InputType()
export default class SignInRequest {
  @InputTransformer.NormalizeEmail()
  @InputValidator.IsEmail()
  @ApiField(() => String, {
    description: '로그인 이메일',
    nullable: false,
    example: 'test@test.com',
  })
  email!: string;

  @InputValidator.IsNotEmptyString()
  @ApiField(() => String, {
    description: '로그인 비밀번호',
    nullable: false,
    example: 'a123456!',
  })
  password!: string;

  @ApiField(() => Boolean, {
    description: '로그인을 유지할지 여부',
    nullable: true,
    defaultValue: false,
    example: 'true',
  })
  keep!: boolean;

  toAccountFilter(): AccountFilter {
    const filter = new AccountFilter();
    filter.email = this.email;
    return filter;
  }
}

import { Field, ObjectType } from '@nestjs/graphql';
import { SignInResult } from '@/modules/application/account-sign/sign-in-result.class';

@ObjectType()
export default class SignInResponse {
  @Field(() => String, {
    description: '사용자 계정 인증 토큰',
    nullable: false,
  })
  accessToken!: string;

  @Field(() => String, {
    description: '사용자 계정 인증 리프레시 토큰',
    nullable: false,
  })
  refreshToken!: string;

  @Field(() => Date, { description: '만료 날짜 시간', nullable: false })
  expiresIn!: Date;

  static fromSignInResult(signInResult: SignInResult): SignInResponse {
    const response = new SignInResponse();
    response.accessToken = signInResult.accessToken;
    response.refreshToken = signInResult.refreshToken;
    response.expiresIn = signInResult.expiresIn;
    return response;
  }
}

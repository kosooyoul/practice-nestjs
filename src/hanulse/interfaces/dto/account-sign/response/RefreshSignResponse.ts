import { Field, ObjectType } from '@nestjs/graphql';
import { ISignInResult } from '@/hanulse/application/dto/sign/sign-in-result';

@ObjectType()
export default class RefreshSignResponse {
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

  static fromSignInResult(signInResult: ISignInResult): RefreshSignResponse {
    const response = new RefreshSignResponse();
    response.accessToken = signInResult.accessToken;
    response.refreshToken = signInResult.refreshToken;
    response.expiresIn = signInResult.expiresIn;
    return response;
  }
}

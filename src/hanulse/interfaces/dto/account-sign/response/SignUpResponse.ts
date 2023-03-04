import { ObjectType } from '@nestjs/graphql';
import { ApiField } from '@/global/interface/rest/decorator';
import { ISignInResult } from '@/hanulse/application/dto/sign/sign-in-result';

@ObjectType()
export default class SignUpResponse {
  @ApiField(() => String, {
    description: '사용자 계정 인증 토큰',
    nullable: false,
    example: 'qwertyuiopasdfghjklzxcvbnm',
  })
  accessToken!: string;

  @ApiField(() => String, {
    description: '사용자 계정 인증 리프레시 토큰',
    nullable: false,
    example: 'qwertyuiopasdfghjklzxcvbnm',
  })
  refreshToken!: string;

  @ApiField(() => Date, {
    description: '만료 날짜 시간',
    nullable: false,
    example: '2022-06-24T09:03:04.261Z',
  })
  expiresIn!: Date;

  static fromSignInResult(signInResult: ISignInResult): SignUpResponse {
    const response = new SignUpResponse();
    response.accessToken = signInResult.accessToken;
    response.refreshToken = signInResult.refreshToken;
    response.expiresIn = signInResult.expiresIn;
    return response;
  }
}

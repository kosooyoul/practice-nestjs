import { ObjectType } from '@nestjs/graphql';
import { ISignInResult } from '@/hanulse/application/dto/sign/sign-in-result';
import { AuoiApiField } from '@/auoi/interface/common/decorator';

@ObjectType()
export default class SignInResponse {
  @AuoiApiField({ type: String, description: '사용자 계정 인증 토큰', nullable: false })
  accessToken!: string;

  @AuoiApiField({ type: String, description: '사용자 계정 인증 리프레시 토큰', nullable: false })
  refreshToken!: string;

  @AuoiApiField({ type: Date, description: '만료 날짜 시간', nullable: false })
  expiresIn!: Date;

  static fromSignInResult(signInResult: ISignInResult): SignInResponse {
    const response = new SignInResponse();
    response.accessToken = signInResult.accessToken;
    response.refreshToken = signInResult.refreshToken;
    response.expiresIn = signInResult.expiresIn;
    return response;
  }
}

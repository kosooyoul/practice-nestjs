import { ObjectType } from '@nestjs/graphql';
import { IHanulseSignInResult } from '@/hanulse/application/dto/sign/sign-in-result';
import { AuoiApiField } from '@/auoi/interface/common/api-field.decorator';

@ObjectType()
export default class HanulseSignInResponse {
  @AuoiApiField({ type: String, description: '접근 토큰', nullable: false })
  accessToken!: string;

  @AuoiApiField({ type: String, description: '갱신 토큰', nullable: false })
  refreshToken!: string;

  @AuoiApiField({ type: Date, description: '접근 토큰 만료 일시', nullable: false })
  accessTokenExpiresIn!: Date;

  @AuoiApiField({ type: Date, description: '갱신 토큰 만료 일시', nullable: false })
  refreshTokenExpiresIn!: Date;

  static fromSignInResult(signInResult: IHanulseSignInResult): HanulseSignInResponse {
    const response = new HanulseSignInResponse();
    response.accessToken = signInResult.accessToken;
    response.refreshToken = signInResult.refreshToken;
    response.accessTokenExpiresIn = signInResult.accessTokenExpiresIn;
    response.refreshTokenExpiresIn = signInResult.refreshTokenExpiresIn;
    return response;
  }
}

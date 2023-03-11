import { Body, Controller, UseGuards } from '@nestjs/common';
import { SignatureAuthGuard } from '@/auoi/auth/signature-auth.guard';
import { ApolloError } from 'apollo-server-core';
import { AccountSignService } from '@/hanulse/application/service/account-sign.service';
import SignUpRequest from '../dto/sign/request/SignUpRequest';
import SignInRequest from '../dto/sign/request/SignInRequest';
import { Signature } from '@/auoi/auth/signature.decorators';
import { Authorization } from '@/auoi/auth/authorization.decorators';
import { ISignature } from '@/auoi/auth/auth.interface';
import RefreshSignRequest from '../dto/sign/request/RefreshSignRequest';
import SignInResponse from '../dto/sign/response/SignInResponse';
import { HanulseUserService } from '@/hanulse/application/service/user.service';
import SignUpResponse from '../dto/sign/response/SignUpResponse';
import SignOutResponse from '../dto/sign/response/SignOutResponse';
import RefreshSignResponse from '../dto/sign/response/RefreshSignResponse';
import { AuoiRestPostApi } from '@/auoi/interface/rest/api.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Nullable } from '@/common/types/native';

const TAG = 'SignResolver';

@ApiTags('Sign')
@Controller('/v0/sign')
export class SignController {
  constructor(private readonly userService: HanulseUserService, private readonly signService: AccountSignService) {}

  @AuoiRestPostApi(() => SignUpResponse, {
    path: '/up',
    description: '회원 가입',
  })
  async signUp(@Body() request: SignUpRequest): Promise<SignUpResponse> {
    const emailExisting = await this.userService.isExistingUserCellPhoneNumber(request.cellPhoneNumber);
    if (emailExisting) throw new ApolloError('USER_EMAIL_ALREADY_HAS_BEEN_USED', TAG);

    const user = await this.userService.createUser(request.toUserFields());

    const result = await this.signService.signIn(user, false);

    return SignUpResponse.fromSignInResult(result);
  }

  @AuoiRestPostApi(() => SignInResponse, {
    path: '/in',
    description: '로그인',
  })
  async signIn(@Body() request: SignInRequest): Promise<SignInResponse> {
    const user = await this.userService.getUserByFilterWithPassword(request.toUserFilter(), request.password);
    if (user == null) throw new ApolloError('USER_PASSWORD_DOES_NOT_MATCH', TAG);

    const result = await this.signService.signIn(user, request.keep);

    return SignInResponse.fromSignInResult(result);
  }

  @UseGuards(SignatureAuthGuard)
  @AuoiRestPostApi(() => SignOutResponse, {
    path: '/out',
    description: '로그아웃',
    auth: true,
  })
  async signOut(@Signature() signature: ISignature): Promise<SignOutResponse> {
    const success = await this.signService.signOut(signature);

    return SignOutResponse.fromSuccess(success);
  }

  @AuoiRestPostApi(() => RefreshSignResponse, {
    path: '/refresh',
    description: '인증 리프레시',
    auth: true,
  })
  async refreshSign(@Authorization() accessToken: Nullable<string>, @Body() request: RefreshSignRequest): Promise<RefreshSignResponse> {
    if (accessToken == null) throw new ApolloError('AUTH_TOKEN_IS_NOT_EXISTS', TAG);

    const result = await this.signService.refreshSign(accessToken, request.refreshToken);

    return RefreshSignResponse.fromSignInResult(result);
  }
}

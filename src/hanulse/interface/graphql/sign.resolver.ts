import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
import { Nullable } from '@/common/types/native';

const TAG = 'SignResolver';

@Injectable()
@Resolver()
export class SignResolver {
  constructor(private readonly userService: HanulseUserService, private readonly signService: AccountSignService) {}

  @Mutation(() => SignUpResponse, { description: '회원 가입' })
  async signUp(@Args('input') request: SignUpRequest): Promise<SignUpResponse> {
    const emailExisting = await this.userService.isExistingUserCellPhoneNumber(request.cellPhoneNumber);
    if (emailExisting) throw new ApolloError('USER_EMAIL_ALREADY_HAS_BEEN_USED', TAG);

    const user = await this.userService.createUser(request.toUserFields());

    const result = await this.signService.signIn(user, false);

    return SignUpResponse.fromSignInResult(result);
  }

  @Mutation(() => SignInResponse, { description: '로그인' })
  async signIn(@Args('input') request: SignInRequest): Promise<SignInResponse> {
    const user = await this.userService.getUserByFilterWithPassword(request.toUserFilter(), request.password);
    if (user == null) throw new ApolloError('USER_PASSWORD_DOES_NOT_MATCH', TAG);

    const result = await this.signService.signIn(user, request.keep);

    return SignInResponse.fromSignInResult(result);
  }

  @UseGuards(SignatureAuthGuard)
  @Mutation(() => SignOutResponse, { description: '로그아웃' })
  async signOut(@Signature() signature: ISignature): Promise<SignOutResponse> {
    const success = await this.signService.signOut(signature);

    return SignOutResponse.fromSuccess(success);
  }

  @Mutation(() => RefreshSignResponse, { description: '인증 리프레시' })
  async refreshSign(@Authorization() accessToken: Nullable<string>, @Args('input') request: RefreshSignRequest): Promise<RefreshSignResponse> {
    if (accessToken == null) throw new ApolloError('AUTH_TOKEN_IS_NOT_EXISTS', TAG);

    const result = await this.signService.refreshSign(accessToken, request.refreshToken);

    return RefreshSignResponse.fromSignInResult(result);
  }
}

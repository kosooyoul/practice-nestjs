import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { HanulseSignService } from '@/hanulse/application/service/sign.service';
import HanulseSignInRequest from '../dto/sign/request/sign-in.request';
import HanulseRefreshSignRequest from '../dto/sign/request/refresh-sign.request';
import HanulseSignInResponse from '../dto/sign/response/sign-in.response';
import { HanulseUserService } from '@/hanulse/application/service/user.service';
import { Nullable } from '@/common/types/native';
import { AuoiSuccessResponse } from '@/auoi/interface/dto/response/success.response';
import { Signature, ISignature, Authorization } from '@/hanulse/common/signature.decorator';

const TAG = 'HanulseSignResolver';

@Injectable()
@Resolver()
export class HanulseSignResolver {
  constructor(private readonly userService: HanulseUserService, private readonly signService: HanulseSignService) {}

  @Mutation(() => HanulseSignInResponse, { description: '로그인' })
  async signIn(@Args('input') request: HanulseSignInRequest): Promise<HanulseSignInResponse> {
    const user = await this.userService.getUserByFilterWithPassword(request.toUserFilter(), request.password);
    if (user == null) throw new ApolloError('USER_PASSWORD_DOES_NOT_MATCH', TAG);

    const result = await this.signService.signIn(user);

    return HanulseSignInResponse.fromSignInResult(result);
  }

  @Mutation(() => AuoiSuccessResponse, { description: '로그아웃' })
  async signOut(@Signature() signature: ISignature): Promise<AuoiSuccessResponse> {
    const success = await this.signService.signOut(signature);

    return AuoiSuccessResponse.fromSuccess(success);
  }

  @Mutation(() => HanulseSignInResponse, { description: '인증 갱신' })
  async refreshSign(@Authorization() accessToken: Nullable<string>, @Args('input') request: HanulseRefreshSignRequest): Promise<HanulseSignInResponse> {
    if (accessToken == null) throw new ApolloError('AUTH_TOKEN_IS_NOT_EXISTS', TAG);

    const result = await this.signService.refreshSign(accessToken, request.refreshToken);

    return HanulseSignInResponse.fromSignInResult(result);
  }
}

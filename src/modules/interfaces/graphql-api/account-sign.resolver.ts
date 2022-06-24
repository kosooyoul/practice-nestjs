import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignatureAuthGuard } from '@/accessory/auth/signature-auth.guard';
import { ApolloError } from 'apollo-server-core';
import { AccountSignService } from '@/modules/application/account-sign/account-sign.service';
import SignUpRequest from '../dto/account-sign/request/SignUpRequest';
import SignInRequest from '../dto/account-sign/request/SignInRequest';
import { Signature } from '@/accessory/auth/signature.decorators';
import { Authorization } from '@/accessory/auth/authorization.decorators';
import { ISignature } from '@/accessory/auth/auth.interface';
import RefreshSignRequest from '../dto/account-sign/request/RefreshSignRequest';
import SignInResponse from '../dto/account-sign/response/SignInResponse';
import { AccountService } from '@/modules/application/account/account.service';
import SignUpResponse from '../dto/account-sign/response/SignUpResponse';
import SignOutResponse from '../dto/account-sign/response/SignOutResponse';
import RefreshSignResponse from '../dto/account-sign/response/RefreshSignResponse';
import { Nullable } from '@/common/types';

const TAG = 'AccountSignResolver';

@Injectable()
@Resolver()
export class AccountSignResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountSignService: AccountSignService,
  ) {}

  @Mutation(() => SignUpResponse, { description: '회원 가입' })
  async signUp(@Args('input') request: SignUpRequest): Promise<SignUpResponse> {
    const emailExisting = await this.accountService.IsExistingAccountEmail(
      request.email,
    );
    if (emailExisting)
      throw new ApolloError('ACCOUNT_EMAIL_ALREADY_HAS_BEEN_USED', TAG);

    const account = await this.accountService.createAccount(
      request.toAccountFields(),
    );

    const result = await this.accountSignService.signIn(account, false);

    return SignUpResponse.fromSignInResult(result);
  }

  @Mutation(() => SignInResponse, { description: '로그인' })
  async signIn(@Args('input') request: SignInRequest): Promise<SignInResponse> {
    const account = await this.accountService.getAccountByFilterWithPassword(
      request.toAccountFilter(),
      request.password,
    );
    if (account == null)
      throw new ApolloError('ACCOUNT_PASSWORD_DOES_NOT_MATCH', TAG);

    const result = await this.accountSignService.signIn(account, request.keep);

    return SignInResponse.fromSignInResult(result);
  }

  @UseGuards(SignatureAuthGuard)
  @Mutation(() => SignOutResponse, { description: '로그아웃' })
  async signOut(@Signature() signature: ISignature): Promise<SignOutResponse> {
    const success = await this.accountSignService.signOut(signature);

    return SignOutResponse.fromSuccess(success);
  }

  @Mutation(() => RefreshSignResponse, { description: '인증 리프레시' })
  async refreshSign(
    @Authorization() accessToken: Nullable<string>,
    @Args('input') request: RefreshSignRequest,
  ): Promise<RefreshSignResponse> {
    if (accessToken == null)
      throw new ApolloError('AUTH_TOKEN_IS_NOT_EXISTS', TAG);

    const result = await this.accountSignService.refreshSign(
      accessToken,
      request.refreshToken,
    );

    return RefreshSignResponse.fromSignInResult(result);
  }
}

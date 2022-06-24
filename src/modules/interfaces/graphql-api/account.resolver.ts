import { Signature } from '@/accessory/auth/signature.decorators';
import { ISignature } from '@/accessory/auth/auth.interface';
import { SignatureAuthGuard } from '@/accessory/auth/signature-auth.guard';
import { AccountService } from '@/modules/application/account/account.service';
import { Injectable, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import MeResponse from '../dto/account/response/MeResponse';

const TAG = 'AccountResolver';

@Injectable()
@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(SignatureAuthGuard)
  @Query(() => MeResponse, { description: '내 계정 정보 조회' })
  async me(@Signature() signature: ISignature): Promise<MeResponse> {
    const account = await this.accountService.getAccountById(signature.id);
    if (account == null) {
      throw new ApolloError('ACCOUNT_DOES_NOT_EXIST', TAG);
    }
    return MeResponse.fromAccount(account);
  }
}

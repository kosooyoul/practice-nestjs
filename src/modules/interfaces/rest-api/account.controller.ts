import { Controller, UseGuards } from '@nestjs/common';
import { AccountService } from '@/modules/application/account/account.service';
import { Signature } from '@/global/auth/signature.decorators';
import { ISignature } from '@/global/auth/auth.interface';
import { ApolloError } from 'apollo-server-core';
import { SignatureAuthGuard } from '@/global/auth/signature-auth.guard';
import MeResponse from '@/modules/interfaces/dto/account/response/MeResponse';
import { GetApi } from '@/global/interface/rest-api/decorator';
import { ApiTags } from '@nestjs/swagger';

const TAG = 'AccountController';

@ApiTags('Account')
@Controller('/v1')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(SignatureAuthGuard)
  @GetApi(() => MeResponse, {
    path: '/account/me',
    description: '내 계정 정보 조회',
    auth: true,
  })
  async me(@Signature() signature: ISignature): Promise<MeResponse> {
    const account = await this.accountService.getAccountById(signature.id);
    if (account == null) {
      throw new ApolloError('ACCOUNT_DOES_NOT_EXIST', TAG);
    }
    return MeResponse.fromAccount(account);
  }
}

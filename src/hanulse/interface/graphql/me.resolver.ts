import { Signature } from '@/auoi/auth/signature.decorators';
import { ISignature } from '@/auoi/auth/auth.interface';
import { SignatureAuthGuard } from '@/auoi/auth/signature-auth.guard';
import { HanulseUserService } from '@/hanulse/application/service/user.service';
import { Injectable, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import HanulseMeResponse from '../dto/user/response/me.response';

const TAG = 'HanulseMeResolver';

@Injectable()
@Resolver()
export class HanulseMeResolver {
  constructor(private readonly userService: HanulseUserService) {}

  @UseGuards(SignatureAuthGuard)
  @Query(() => HanulseMeResponse, { description: '내 정보 조회' })
  async me(@Signature() signature: ISignature): Promise<HanulseMeResponse> {
    const user = await this.userService.getUserById(signature.id);
    if (user == null) {
      throw new ApolloError('USER_DOES_NOT_EXIST', TAG);
    }
    return HanulseMeResponse.fromUser(user);
  }
}

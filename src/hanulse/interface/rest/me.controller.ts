import { Controller, UseGuards } from '@nestjs/common';
import { HanulseUserService } from '@/hanulse/application/service/user.service';
import { Signature } from '@/auoi/auth/signature.decorators';
import { ISignature } from '@/auoi/auth/auth.interface';
import { ApolloError } from 'apollo-server-core';
import { SignatureAuthGuard } from '@/auoi/auth/signature-auth.guard';
import HanulseMeResponse from '@/hanulse/interface/dto/user/response/me.response';
import { AuoiGetApi } from '@/auoi/interface/rest/decorator';
import { ApiTags } from '@nestjs/swagger';

const TAG = 'HanulseMeController';

@ApiTags('Hanulse Me')
@Controller('/v1/me')
export class HanulseMeController {
  constructor(private readonly userService: HanulseUserService) {}

  @UseGuards(SignatureAuthGuard)
  @AuoiGetApi(() => HanulseMeResponse, {
    path: '/',
    description: '내 정보 조회',
    auth: true,
  })
  async me(@Signature() signature: ISignature): Promise<HanulseMeResponse> {
    const user = await this.userService.getUserById(signature.id);
    if (user == null) {
      throw new ApolloError('USER_DOES_NOT_EXIST', TAG);
    }
    return HanulseMeResponse.fromUser(user);
  }
}

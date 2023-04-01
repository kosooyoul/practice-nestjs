import { Controller, UseGuards } from '@nestjs/common';
import { HanulseUserService } from '@/hanulse/application/service/user.service';
import { ApolloError } from 'apollo-server-core';
import HanulseMeResponse from '@/hanulse/interface/dto/user/response/me.response';
import { AuoiRestGetApi } from '@/auoi/interface/rest/api.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Signature, ISignature } from '@/hanulse/common/signature.decorator';

const TAG = 'HanulseMeController';

@ApiTags('Hanulse Me')
@Controller('/v1/me')
export class HanulseMeController {
  constructor(private readonly userService: HanulseUserService) {}

  @AuoiRestGetApi(() => HanulseMeResponse, {
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

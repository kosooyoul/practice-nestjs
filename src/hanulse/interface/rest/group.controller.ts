import { Body, Controller, Param, Query } from '@nestjs/common';
import { AuoiDeleteApi, AuoiGetApi, AuoiPatchApi, AuoiPostApi } from '@/auoi/interface/rest/decorator';
import { ApiTags } from '@nestjs/swagger';

// const TAG = 'HanulseGroupController';

// TODO: 상세 구현 필요
class HanulseGroupRequest {}
class HanulseGroupsRequest {}
class HanulseGroupUserRequest {}
class HanulseGroupUsersRequest {}
class HanulseCreateGroupUserRequest {}
class HanulseUpdateGroupUserRequest {}
class HanulseDeleteGroupUserRequest {}
class HanluseGroupResponse {
  [key: string]: any;
}
class HanluseGroupsResponse {
  [key: string]: any;
}
class HanluseGroupUserResponse {
  [key: string]: any;
}
class HanluseGroupUsersResponse {
  [key: string]: any;
}
class SuccessResponse {
  success: boolean;

  static fromSuccess(success: boolean): SuccessResponse {
    const response = new SuccessResponse();
    response.success = success;
    return response;
  }
}

@ApiTags('Hanulse Group')
@Controller('/v1/group')
export class HanulseGroupController {
  @AuoiGetApi(() => HanluseGroupResponse, { path: '/:groupId([0-9a-fA-F]{24})', description: '그룹 조회' })
  async getGroup(@Param('groupId') groupId: string): Promise<HanluseGroupResponse> {
    const response = new HanluseGroupResponse();
    response.id = '000000000000000000000001';
    response.name = 'Alpha';
    response.description = 'description 1';
    return response;
  }

  @AuoiGetApi(() => HanluseGroupsResponse, { path: '/groups', description: '그룹 목록 조회' })
  async getGroups(@Query() request: HanulseGroupsRequest): Promise<HanluseGroupsResponse> {
    const response = new HanluseGroupsResponse();
    response.groups = [
      { id: '000000000000000000000001', name: 'Alpha', description: 'description 1' },
      { id: '000000000000000000000002', name: 'Beta', description: 'description 2' },
    ];
    response.countOfTotal = 2;
    return response;
  }

  @AuoiPostApi(() => HanluseGroupUserResponse, { path: '/', description: '그룹 생성' })
  async createGroup(@Body() request: HanulseCreateGroupUserRequest): Promise<HanluseGroupUserResponse> {
    const response = new HanluseGroupUserResponse();
    response.id = '000000000000000000000001';
    response.name = 'Agnes';
    response.cellPhoneNumber = '010-0000-0001';
    return response;
  }

  @AuoiPatchApi(() => HanluseGroupUserResponse, { path: '/:groupId([0-9a-fA-F]{24})', description: '그룹 수정' })
  async updateGroup(@Param('groupId') groupId: string, @Body() request: HanulseUpdateGroupUserRequest): Promise<HanluseGroupUserResponse> {
    const response = new HanluseGroupUserResponse();
    response.id = '000000000000000000000001';
    response.name = 'Agnes';
    response.cellPhoneNumber = '010-0000-0001';
    return response;
  }

  @AuoiDeleteApi(() => SuccessResponse, { path: '/:groupId([0-9a-fA-F]{24})', description: '그룹 삭제' })
  async deleteGroup(@Param('groupId') groupId: string): Promise<SuccessResponse> {
    return SuccessResponse.fromSuccess(true);
  }

  @AuoiGetApi(() => HanluseGroupUsersResponse, { path: '/:groupId([0-9a-fA-F]{24})/users', description: '그룹 유저 목록 조회' })
  async getGroupUsers(@Param('groupId') groupId: string, @Query() request: HanulseGroupUsersRequest): Promise<HanluseGroupUsersResponse> {
    const response = new HanluseGroupUsersResponse();
    response.users = [
      { id: '000000000000000000000001', name: 'Agnes', cellPhoneNumber: '010-0000-0001' },
      { id: '000000000000000000000002', name: 'Bella', cellPhoneNumber: '010-0000-0002' },
      { id: '000000000000000000000003', name: 'Cathy', cellPhoneNumber: '010-0000-0003' },
    ];
    response.countOfTotal = 3;
    return response;
  }

  @AuoiPostApi(() => HanluseGroupUserResponse, { path: '/:groupId([0-9a-fA-F]{24})/user', description: '그룹 유저 생성' })
  async createGroupUser(@Param('groupId') groupId: string, @Body() request: HanulseCreateGroupUserRequest): Promise<HanluseGroupUserResponse> {
    const response = new HanluseGroupUserResponse();
    response.id = '000000000000000000000001';
    response.name = 'Agnes';
    response.cellPhoneNumber = '010-0000-0001';
    return response;
  }

  @AuoiPatchApi(() => HanluseGroupUserResponse, { path: '/:groupId([0-9a-fA-F]{24})/user/:userId([0-9a-fA-F]{24})', description: '그룹 유저 수정' })
  async updateGroupUser(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
    @Body() request: HanulseUpdateGroupUserRequest,
  ): Promise<HanluseGroupUserResponse> {
    const response = new HanluseGroupUserResponse();
    response.id = '000000000000000000000001';
    response.name = 'Agnes';
    response.cellPhoneNumber = '010-0000-0001';
    return response;
  }

  @AuoiDeleteApi(() => SuccessResponse, { path: '/:groupId([0-9a-fA-F]{24})/user/:userId([0-9a-fA-F]{24})', description: '그룹 유저 삭제' })
  async deleteGroupUser(@Param('groupId') groupId: string, @Param('userId') userId: string): Promise<SuccessResponse> {
    return SuccessResponse.fromSuccess(true);
  }
}

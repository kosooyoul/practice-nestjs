import { Body, Controller, Param, Query } from '@nestjs/common';
import { AuoiRestDeleteApi, AuoiRestGetApi, AuoiRestPatchApi, AuoiRestPostApi } from '@/auoi/interface/rest/api.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuoiSuccessResponse } from '@/auoi/interface/dto/response/success.response';

// const TAG = 'HanulseClassController';

// TODO: 상세 구현 필요
class HanulseClassRequest {}
class HanulseClassesRequest {}
class HanulseStudentRequest {}
class HanulseStudentsRequest {}
class HanulseCreateStudentRequest {}
class HanulseUpdateStudentRequest {}
class HanulseDeleteStudentRequest {}
class HanluseClassResponse {
  [key: string]: any;
}
class HanluseClassesResponse {
  [key: string]: any;
}
class HanluseStudentResponse {
  [key: string]: any;
}
class HanluseStudentsResponse {
  [key: string]: any;
}

@ApiTags('Hanulse Class')
@Controller('/v1/Class')
export class HanulseClassController {
  @AuoiRestGetApi(() => HanluseClassResponse, { path: '/:classId([0-9a-fA-F]{24})', description: '그룹 조회' })
  async getClass(@Param('classId') classId: string): Promise<HanluseClassResponse> {
    const response = new HanluseClassResponse();
    response.id = '000000000000000000000001';
    response.title = 'Math';
    response.description = 'description 1';
    return response;
  }

  @AuoiRestGetApi(() => HanluseClassesResponse, { path: '/Classs', description: '그룹 목록 조회' })
  async getClasss(@Query() request: HanulseClassesRequest): Promise<HanluseClassesResponse> {
    const response = new HanluseClassesResponse();
    response.classes = [
      { id: '000000000000000000000001', title: 'Math', description: 'description 1' },
      { id: '000000000000000000000002', title: 'Economics', description: 'description 2' },
    ];
    response.countOfTotal = 2;
    return response;
  }

  @AuoiRestPostApi(() => HanluseStudentResponse, { path: '/', description: '그룹 생성' })
  async createClass(@Body() request: HanulseCreateStudentRequest): Promise<HanluseStudentResponse> {
    const response = new HanluseStudentResponse();
    response.id = '000000000000000000000001';
    response.name = 'Agnes';
    response.cellPhoneNumber = '010-0000-0001';
    return response;
  }

  @AuoiRestPatchApi(() => HanluseStudentResponse, { path: '/:classId([0-9a-fA-F]{24})', description: '그룹 수정' })
  async updateClass(@Param('classId') classId: string, @Body() request: HanulseUpdateStudentRequest): Promise<HanluseStudentResponse> {
    const response = new HanluseStudentResponse();
    response.id = '000000000000000000000001';
    response.name = 'Agnes';
    response.cellPhoneNumber = '010-0000-0001';
    return response;
  }

  @AuoiRestDeleteApi(() => AuoiSuccessResponse, { path: '/:classId([0-9a-fA-F]{24})', description: '그룹 삭제' })
  async deleteClass(@Param('classId') classId: string): Promise<AuoiSuccessResponse> {
    return AuoiSuccessResponse.fromSuccess(true);
  }

  @AuoiRestGetApi(() => HanluseStudentsResponse, { path: '/:classId([0-9a-fA-F]{24})/students', description: '그룹 유저 목록 조회' })
  async getStudents(@Param('classId') classId: string, @Query() request: HanulseStudentsRequest): Promise<HanluseStudentsResponse> {
    const response = new HanluseStudentsResponse();
    response.students = [
      { id: '000000000000000000000001', userId: '000000000000000000000001' },
      { id: '000000000000000000000002', userId: '000000000000000000000002' },
      { id: '000000000000000000000003', userId: '000000000000000000000003' },
    ];
    response.countOfTotal = 3;
    return response;
  }

  @AuoiRestPostApi(() => HanluseStudentResponse, { path: '/:classId([0-9a-fA-F]{24})/student', description: '그룹 유저 생성' })
  async createStudent(@Param('classId') classId: string, @Body() request: HanulseCreateStudentRequest): Promise<HanluseStudentResponse> {
    const response = new HanluseStudentResponse();
    response.id = '000000000000000000000001';
    response.userId = '000000000000000000000001';
    return response;
  }

  @AuoiRestPatchApi(() => HanluseStudentResponse, { path: '/:classId([0-9a-fA-F]{24})/student/:studentId([0-9a-fA-F]{24})', description: '그룹 유저 수정' })
  async updateStudent(
    @Param('classId') classId: string,
    @Param('userId') userId: string,
    @Body() request: HanulseUpdateStudentRequest,
  ): Promise<HanluseStudentResponse> {
    const response = new HanluseStudentResponse();
    response.id = '000000000000000000000001';
    response.userId = '000000000000000000000001';
    return response;
  }

  @AuoiRestDeleteApi(() => AuoiSuccessResponse, { path: '/:classId([0-9a-fA-F]{24})/student/:studentId([0-9a-fA-F]{24})', description: '그룹 유저 삭제' })
  async deleteStudent(@Param('classId') classId: string, @Param('userId') userId: string): Promise<AuoiSuccessResponse> {
    return AuoiSuccessResponse.fromSuccess(true);
  }
}

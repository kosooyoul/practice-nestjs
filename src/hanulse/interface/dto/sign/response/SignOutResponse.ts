import { ObjectType } from '@nestjs/graphql';
import { ApiField } from '@/global/interface/rest/decorator';

@ObjectType()
export default class SignOutResponse {
  @ApiField({ type: Boolean, description: '성공 여부', nullable: false })
  success!: boolean;

  static fromSuccess(success: boolean): SignOutResponse {
    const response = new SignOutResponse();
    response.success = success;
    return response;
  }
}

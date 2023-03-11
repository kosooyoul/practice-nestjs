import { ObjectType } from '@nestjs/graphql';
import { AuoiApiField } from '@/auoi/interface/common/decorator';

@ObjectType()
export default class SignOutResponse {
  @AuoiApiField({ type: Boolean, description: '성공 여부', nullable: false })
  success!: boolean;

  static fromSuccess(success: boolean): SignOutResponse {
    const response = new SignOutResponse();
    response.success = success;
    return response;
  }
}

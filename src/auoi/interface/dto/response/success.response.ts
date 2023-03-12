import { ObjectType } from '@nestjs/graphql';
import { AuoiApiField } from '@/auoi/interface/common/api-field.decorator';

@ObjectType()
export class AuoiSuccessResponse {
  @AuoiApiField({ type: Boolean, description: '성공 여부', nullable: false })
  success!: boolean;

  static fromSuccess(success: boolean): AuoiSuccessResponse {
    const response = new AuoiSuccessResponse();
    response.success = success;
    return response;
  }
}

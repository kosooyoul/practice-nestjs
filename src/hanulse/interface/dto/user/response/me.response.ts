import { ObjectType } from '@nestjs/graphql';
import { HanulseUser } from '@/hanulse/domain/user.entity';
import { AuoiApiField } from '@/auoi/interface/common/api-field.decorator';

@ObjectType()
export default class HanulseMeResponse {
  @AuoiApiField({ type: String, description: '사용자 아이디', nullable: false, example: '000000000000000000000000' })
  id!: string;

  @AuoiApiField({ type: String, description: '사용자 이름', nullable: false, example: '테스트' })
  name!: string;

  @AuoiApiField({ type: String, description: '사용자 휴대 전화 번호', nullable: false, example: 'test@test.com' })
  cellPhoneNumber!: string;

  static fromUser(user: HanulseUser): HanulseMeResponse {
    const response = new HanulseMeResponse();
    response.id = user.id;
    response.name = user.name;
    response.cellPhoneNumber = user.cellPhoneNumber;
    return response;
  }
}

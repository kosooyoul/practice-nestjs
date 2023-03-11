import { ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from '@/common/types/mongo';
import { Account } from '@/hanulse/domain/account.entity';
import { AuoiApiField } from '@/auoi/interface/common/decorator';

@ObjectType()
export default class MeResponse {
  @AuoiApiField({ type: ID, description: '계정 아이디', nullable: false, example: 'ObjectId("000000000000000000000000"' })
  _id!: ObjectId;

  @AuoiApiField({ type: String, description: '계정 이메일', nullable: false, example: 'test@test.com' })
  email!: string;

  @AuoiApiField({ type: String, description: '계정 사용자 이름', nullable: false, example: '테스트' })
  username!: string;

  @AuoiApiField({ type: Date, description: '수정한 날짜 시간', nullable: false, example: '2022-06-24T07:38:35.733Z' })
  updatedAt!: Date;

  @AuoiApiField({ type: Date, description: '등록한 날짜 시간', nullable: false, example: '2022-06-24T07:38:35.733Z' })
  createdAt!: Date;

  static fromAccount(account: Account): MeResponse {
    const response = new MeResponse();
    response._id = account._id;
    response.email = account.email;
    response.username = account.username;
    response.updatedAt = account.updatedAt;
    response.createdAt = account.createdAt;
    return response;
  }
}

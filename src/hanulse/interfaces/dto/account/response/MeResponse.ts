import { ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from '@/global/common/types';
import { Account } from '@/hanulse/domain/account.entity';
import { ApiField } from '@/global/interface/rest/decorator';

@ObjectType()
export default class MeResponse {
  @ApiField(() => ID, {
    description: '계정 아이디',
    nullable: false,
    example: 'ObjectId("000000000000000000000000"',
  })
  _id!: ObjectId;

  @ApiField(() => String, {
    description: '계정 이메일',
    nullable: false,
    example: 'test@test.com',
  })
  email!: string;

  @ApiField(() => String, {
    description: '계정 사용자 이름',
    nullable: false,
    example: '테스트',
  })
  username!: string;

  @ApiField(() => Date, {
    description: '수정한 날짜 시간',
    nullable: false,
    example: '2022-06-24T07:38:35.733Z',
  })
  updatedAt!: Date;

  @ApiField(() => Date, {
    description: '등록한 날짜 시간',
    nullable: false,
    example: '2022-06-24T07:38:35.733Z',
  })
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

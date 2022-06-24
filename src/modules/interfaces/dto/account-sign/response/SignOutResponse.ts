import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class SignOutResponse {
  @Field(() => Boolean, { description: '성공 여부', nullable: false })
  success!: boolean;

  static fromSuccess(success: boolean): SignOutResponse {
    const response = new SignOutResponse();
    response.success = success;
    return response;
  }
}

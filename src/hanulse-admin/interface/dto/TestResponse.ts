import { ObjectType } from '@nestjs/graphql';
import { ApiField } from '@/global/interface/rest/decorator';

@ObjectType()
export default class TestResponse {
  @ApiField({
    type: String,
    description: '제목',
    nullable: false,
    example: 'title',
  })
  title!: string;

  @ApiField({
    type: String,
    description: '설명',
    nullable: false,
    example: 'description',
  })
  description!: string;

  static from(obj: any): TestResponse {
    const response = new TestResponse();
    response.title = obj.title;
    response.description = obj.description;
    return response;
  }
}

import { Injectable } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import TestResponse from '../dto/TestResponse';

// const TAG = 'TestResolver';

@Injectable()
@Resolver()
export class TestResolver {
  @Query(() => TestResponse, { description: '테스트' })
  async test(): Promise<TestResponse> {
    return TestResponse.from({
      title: 'GraphQL 멀티 엔드포인트 테스트',
      description: '삽집로 계속 파다보니 여기까지...',
    });
  }
}

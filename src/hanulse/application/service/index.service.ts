import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  index(): string {
    throw new HttpException('Cannot GET /', HttpStatus.NOT_FOUND);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class BorrowReturnBooksService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Controller, Get } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';

@Controller()
export class BorrowReturnBooksController {
  constructor(private readonly borrowReturnBooksService: BorrowReturnBooksService) {}

  @Get()
  getHello(): string {
    return this.borrowReturnBooksService.getHello();
  }
}

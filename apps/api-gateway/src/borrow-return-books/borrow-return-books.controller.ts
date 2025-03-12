import { Controller } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';

@Controller('borrow-return-books')
export class BorrowReturnBooksController {
  constructor(private readonly borrowReturnBooksService: BorrowReturnBooksService) {}
}

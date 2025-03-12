import { Module } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { BorrowReturnBooksController } from './borrow-return-books.controller';

@Module({
  controllers: [BorrowReturnBooksController],
  providers: [BorrowReturnBooksService],
})
export class BorrowReturnBooksModule {}

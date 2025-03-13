import { Module } from '@nestjs/common';
import { BorrowReturnBooksController } from './borrow-return-books.controller';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { SharedModule } from '../../../libs/shared/src';
import { BooksModule } from '../../books/src/books.module';


@Module({
  imports: [SharedModule, BooksModule],
  controllers: [BorrowReturnBooksController],
  providers: [BorrowReturnBooksService],
})
export class BorrowReturnBooksModule { }

import { Module } from '@nestjs/common';
import { BorrowReturnBooksController } from './borrow-return-books.controller';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { SharedModule } from '../../../libs/shared/src';


@Module({
  imports: [SharedModule],
  controllers: [BorrowReturnBooksController],
  providers: [BorrowReturnBooksService],
})
export class BorrowReturnBooksModule { }

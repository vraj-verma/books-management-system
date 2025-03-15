import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { SharedModule } from '../../../libs/shared/src';
import { BorrowReturnBooksModule } from './borrow-return-books/borrow-return-books.module';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    BorrowReturnBooksModule,
    SharedModule
  ],
  exports: [SharedModule]
})
export class ApiGatewayModule { }

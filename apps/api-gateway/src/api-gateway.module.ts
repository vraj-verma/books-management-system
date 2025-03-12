import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { SharedModule } from '../../../libs/shared/src';
import { ApiGatewayService } from './api-gateway.service';
import { ApiGatewayController } from './api-gateway.controller';
import { BorrowReturnBooksModule } from './borrow-return-books/borrow-return-books.module';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    BorrowReturnBooksModule,
    SharedModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
  exports: [SharedModule]
})
export class ApiGatewayModule { }

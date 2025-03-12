import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { BorrowReturnBooksModule } from './borrow-return-books/borrow-return-books.module';
import { SharedJwtModule } from '../../../libs/shared-jwt/src';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    BorrowReturnBooksModule,
    SharedJwtModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }

import { Module } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { BorrowReturnBooksController } from './borrow-return-books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedModule } from '../../../../libs/shared/src';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BORROW_RETURN_CLIENT',
        transport: Transport.TCP,
        options: {
          port: 5001
        }
      }
    ]),
    SharedModule
  ],
  controllers: [BorrowReturnBooksController],
  providers: [BorrowReturnBooksService],
})
export class BorrowReturnBooksModule { }

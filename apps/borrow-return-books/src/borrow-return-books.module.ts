import { Module } from '@nestjs/common';
import { BorrowReturnBooksController } from './borrow-return-books.controller';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { SharedDatabaseModule } from '../../../libs/shared-database/src/shared.module';


@Module({
  imports: [SharedDatabaseModule],
  controllers: [BorrowReturnBooksController],
  providers: [BorrowReturnBooksService],
})
export class BorrowReturnBooksModule { }

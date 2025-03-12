import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SharedModule } from '../../../libs/shared/src';


@Module({
  imports: [
    SharedModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }

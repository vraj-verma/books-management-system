import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { SharedDatabaseModule } from '../../../libs/shared-database/src';
import { SharedJwtModule } from '../../../libs/shared-jwt/src';

@Module({
  imports: [
    SharedDatabaseModule,
    SharedJwtModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }

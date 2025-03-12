import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SharedModule } from '../../../../libs/shared/src';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register(
      [
        {
          name: 'BOOKS_CLIENT',
          transport: Transport.TCP,
          options: {
            port: 4001
          }
        }
      ]
    ),
    SharedModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }

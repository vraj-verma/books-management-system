import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedJwtModule } from '../../../../libs/shared-jwt/src';

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
    SharedJwtModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }

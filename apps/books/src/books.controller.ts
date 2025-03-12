import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BooksDTO } from './dto/books.dto';

@Controller()
export class BooksController {

  constructor(
    private readonly booksService: BooksService
  ) { }


  @MessagePattern('books.add')
  async addBook(
    @Payload() payload: BooksDTO
  ) {

    const isAlreadyExist = await this.booksService.getBookByTitle(payload.title);

    if (isAlreadyExist) {
      throw new RpcException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: `Book with title: ${payload.title} already exist`
        }
      );
    }

    const response = await this.booksService.createBook(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Something went wrong, please try again`
        }
      );
    }

    return response;

  }


}

import { Controller, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BooksDTO } from './dto/books.dto';
import { Paged } from './types/pagination.type';

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


  @MessagePattern('books.updateById')
  async updateBookById(
    @Payload() payload: BooksDTO
  ) {

    const response = await this.booksService.updateBookById(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Failed to udpate book`
        }
      );
    }

    return response;

  }



  @MessagePattern('books.getBooks')
  async getBooks(
    @Payload() paged: Paged
  ) {

    const response = await this.booksService.getBooks(paged);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Failed to get book`
        }
      );
    }

    let total = response.length;

    if (paged.offset >= 0 || total >= paged.limit) {
      total = await this.booksService.countTotal();
    }

    const tableResponse = {
      offset: paged.offset,
      limit: paged.limit,
      returned: response.length,
      data: response
    }

    return tableResponse;

  }



  @MessagePattern('books.getBookBySearch')
  async getBookBySearch(
    @Payload() payload: { title?: string, author?: string }
  ) {

    const response = await this.booksService.getBookBySearch(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Failed to get book`
        }
      );
    }

    return response;

  }


  @MessagePattern('books.deleteBook')
  async deleteBookById(
    @Payload() payload: string
  ) {

    const response = await this.booksService.deleteBook(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Book with id: ${payload} does not exist`
        }
      );
    }

    return response;

  }


}

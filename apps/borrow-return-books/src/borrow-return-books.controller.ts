import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BorrowBook } from './dto/borrow-return-book.dto';

@Controller()
export class BorrowReturnBooksController {

  constructor(
    private readonly borrowReturnBooksService: BorrowReturnBooksService
  ) { }


  @MessagePattern('books.borrow')
  async borrowBook(
    @Payload() payload: BorrowBook
  ) {

    const isAlreadyBorrowed = await this.borrowReturnBooksService.isAlreadyBorrowed(payload);

    if (isAlreadyBorrowed) {
      throw new RpcException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: `Already Borrowed`
        }
      );
    }

    const response = await this.borrowReturnBooksService.borrowBook(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `failed to borrow the book`
        }
      );
    }

    return response;

  }


  @MessagePattern('books.return')
  async returnBook(
    @Payload() payload: BorrowBook
  ) {

    // const isAlreadyBorrowed = await this.borrowReturnBooksService.isAlreadyBorrowed(payload);

    // if (isAlreadyBorrowed) {
    //   throw new RpcException(
    //     {
    //       statusCode: HttpStatus.CONFLICT,
    //       message: `Already Borrowed`
    //     }
    //   );
    // }

    const response = await this.borrowReturnBooksService.returnBook(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `failed to returned the book`
        }
      );
    }

    return response;

  }

}

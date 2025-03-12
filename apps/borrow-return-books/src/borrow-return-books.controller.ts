import { Controller, HttpStatus } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BorrowBook, ReturnBook } from './dto/borrow-return-book.dto';

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


    const result = await this.borrowReturnBooksService.borrowAnotherBook(payload);

    if (result) return result;

    const isFirstTimeBorrow = await this.borrowReturnBooksService.isFirstTimeBorrow(payload.userId);

    if (!isFirstTimeBorrow) {

      const response = await this.borrowReturnBooksService.borrowBook(payload);

      if (!response) {
        throw new RpcException(
          {
            statusCode: HttpStatus.NOT_IMPLEMENTED,
            message: `failed to borrow the book`
          }
        );
      }
    }

    return { message: 'Book(s) borrowed successfully' };

  }


  @MessagePattern('books.return')
  async returnBook(
    @Payload() payload: ReturnBook
  ) {

    const isAlreadyReturned = await this.borrowReturnBooksService.isAlreadyReturnedBook(payload);

    if (isAlreadyReturned) {
      throw new RpcException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Already Returned`
        }
      );
    }

    const response = await this.borrowReturnBooksService.returnBook(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Either does not exists or deleted`
        }
      );
    }

    return response;

  }

}

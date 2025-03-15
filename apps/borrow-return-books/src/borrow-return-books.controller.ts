import { Controller, HttpStatus } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BorrowBook, ReturnBook } from './dto/borrow-return-book.dto';
import { BooksService } from '../../books/src/books.service';


@Controller()
export class BorrowReturnBooksController {

  constructor(
    private readonly booksService: BooksService,
    private readonly borrowReturnBooksService: BorrowReturnBooksService
  ) { }



  @MessagePattern('books.borrow')
  async borrowBook(
    @Payload() payload: BorrowBook
  ) {

    const bookIds = payload.books.map(x => x.bookId);

    const isAlreadyBorrowedByUser = await this.borrowReturnBooksService.isAlreadyBorrowed(payload);

    if (isAlreadyBorrowedByUser) {
      throw new RpcException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: `Already Borrowed`
        }
      );
    }


    const isAlreadyBorrowedByAnotherUser = await this.booksService.getBookByById(bookIds);

    if (isAlreadyBorrowedByAnotherUser) {
      throw new RpcException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: `Already Borrowed by another user`
        }
      );
    }


    const result = await this.borrowReturnBooksService.borrowAnotherBook(payload);

    if (result) {

      await this.booksService.updateBookStatus(bookIds, true);

      return result;
    };

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

      await this.booksService.updateBookStatus(bookIds, true);

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

    await this.booksService.updateBookStatus([payload.bookId], false);

    return response;

  }


  @MessagePattern('books.borrowedByUser')
  async borrowedBooks(
    @Payload() email: string
  ) {

    const response = await this.borrowReturnBooksService.booksBorrowedByUser(email);

    if (!response || response.length < 1) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `No books borrowed.`
        }
      );
    }

    return response;

  }


  @MessagePattern('books.mostBorrowedBook')
  async mostborrowedBooks() {

    const response = await this.booksService.mostFrequentlyBorrowBook();

    if (!response || response.length < 1) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `No Data`
        }
      );
    }

    return response;

  }

}

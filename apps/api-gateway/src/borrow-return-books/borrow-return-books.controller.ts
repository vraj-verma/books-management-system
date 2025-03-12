import { Body, Controller, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { Request, Response } from 'express';
import { BorrowBook, ReturnBook } from '../../../borrow-return-books/src/dto/borrow-return-book.dto';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';
import { AuthUser } from '../../../../libs/shared/src';

@Controller('borrow-return-books')
export class BorrowReturnBooksController {

  constructor(
    private readonly borrowReturnBooksService: BorrowReturnBooksService
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async borrowBook(
    @Res() res: Response,
    @Req() req: Request,
    @Body() payload: BorrowBook
  ) {

    try {

      const { userId } = <AuthUser>req['user'];

      payload.userId = userId;

      await this.borrowReturnBooksService.borrowBook(payload);

      return res.status(201).json({
        status: true,
        response: `Book borrowed successfully`
      })

    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json(
          {
            status: false,
            message: error.message
          }
        );
      }
    }

  }



  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async returnBook(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') bookId: string,
    @Body() payload: ReturnBook
  ) {

    try {

      const { userId } = <AuthUser>req['user'];

      payload.userId = userId;
      payload.bookId = bookId;

      await this.borrowReturnBooksService.returnBook(payload);

      return res.status(201).json({
        status: true,
        response: `Book with id: ${bookId} returned successfully`
      })

    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json(
          {
            status: false,
            message: error.message
          }
        );
      }
    }

  }

}

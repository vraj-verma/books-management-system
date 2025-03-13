import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { Request, Response } from 'express';
import { BorrowBook, ReturnBook } from '../../../borrow-return-books/src/dto/borrow-return-book.dto';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';
import { AuthUser } from '../../../../libs/shared/src';
import mongoose from 'mongoose';

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
    @Param('id') bookId: mongoose.Schema.Types.ObjectId,
    @Body() payload: ReturnBook
  ) {

    try {

      const { userId } = <AuthUser>req['user'];

      payload.userId = userId;
      payload.bookId = bookId;

      await this.borrowReturnBooksService.returnBook(payload);

      return res.status(200).json({
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



  @UseGuards(JwtAuthGuard)
  @Get('borrowed')
  async booksBorrowed(
    @Res() res: Response,
    @Req() req: Request,
  ) {

    try {

      const { userId } = <AuthUser>req['user'];

      const response = await this.borrowReturnBooksService.borrowedBooksByUser(userId);

      return res.status(200).json({
        status: true,
        response
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
  @Get('most-borrowed')
  async mostBorrowedBook(
    @Res() res: Response,
  ) {

    try {

      const response = await this.borrowReturnBooksService.mostBorrowedBook();

      return res.status(200).json({
        status: true,
        response
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

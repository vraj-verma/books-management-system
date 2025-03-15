import {
  Body,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  Controller,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { AuthUser } from '../../../../libs/shared/src';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { InputValidation } from '../validations/input.validation';
import { BorrowReturnBooksService } from './borrow-return-books.service';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';
import { BorrowBook, ReturnBook } from '../../../borrow-return-books/src/dto/borrow-return-book.dto';

@ApiTags('Book Summary Controller')
@Controller()
export class BorrowReturnBooksController {

  constructor(
    private readonly borrowReturnBooksService: BorrowReturnBooksService
  ) { }


  @ApiOperation({ summary: 'Borrow Book(s)', description: 'Provide Book ID(s) to borrow book(s)' })
  @UseGuards(JwtAuthGuard)
  @Post('borrow')
  async borrowBook(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe(InputValidation.borrowBookSchema)) payload: BorrowBook
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


  @ApiOperation({ summary: 'Return Book', description: 'Provide Book ID & returned date to return book' })
  @UseGuards(JwtAuthGuard)
  @Patch('return/:id')
  async returnBook(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') bookId: mongoose.Schema.Types.ObjectId,
    @Body(new ValidationPipe(InputValidation.returnBookSchema)) payload: ReturnBook
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


  @ApiOperation({ summary: 'Get your current borrowed books', description: 'Get the list of all active borrowed book(s)' })
  @UseGuards(JwtAuthGuard)
  @Get('books-borrowed')
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


  @ApiOperation({ summary: 'Most Frequenty borrow book', description: 'Get the count of most popular book' })
  @UseGuards(JwtAuthGuard)
  @Get('borrow/most-borrowed')
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

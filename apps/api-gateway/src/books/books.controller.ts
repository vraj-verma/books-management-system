import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from 'express';
import { BooksDTO } from '../../../books/src/dto/books.dto';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';
import { Paged } from '../../../books/src/types/pagination.type';
import { ValidationPipe } from '../pipes/validation.pipe';
import { InputValidation } from '../validations/input.validation';


@Controller('books')
export class BooksController {

  constructor(
    private readonly booksService: BooksService
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async addBook(
    @Res() res: Response,
    @Body() payload: BooksDTO
  ) {

    try {

      const response = await this.booksService.addBookMessage(payload);

      return res.status(201).json({
        status: true,
        response
      });
    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }
    }

  }



  @Get('list')
  async getBooks(
    @Res() res: Response,
    @Query(new ValidationPipe(InputValidation.paginationSchema)) paged: Paged
  ) {

    try {

      const response = await this.booksService.GetBooksMessage(paged);

      return res.status(200).json({
        status: true,
        response
      });
    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }
    }

  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBookByID(
    @Res() res: Response,
    @Param('id') bookId: string,
    @Body() payload: BooksDTO
  ) {

    try {

      payload.bookId = bookId;

      await this.booksService.updateBookMessage(payload);

      return res.status(200).json({
        status: true,
        response: `Book with id: ${bookId} updated successfully`
      });
    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }
    }

  }



  @Get()
  async getBookBySearch(
    @Res() res: Response,
    @Query() payload: { title?: string, author?: string }
  ) {

    try {

      const response = await this.booksService.GetBookBySearchMessage(payload);

      return res.status(200).json({
        status: true,
        response
      });
    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }
    }

  }




  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBookById(
    @Res() res: Response,
    @Param('id') bookId: string
  ) {

    try {

      await this.booksService.deleteBookByIdMessage(bookId);

      return res.status(200).json(
        {
          status: true,
          response: `Book with id: ${bookId} deleted successfully`
        }
      );
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

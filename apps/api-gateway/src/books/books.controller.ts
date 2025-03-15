import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { Response } from 'express';
import { BooksService } from './books.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { BooksDTO } from '../../../books/src/dto/books.dto';
import { Paged } from '../../../books/src/types/pagination.type';
import { InputValidation } from '../validations/input.validation';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';


@ApiTags('Books Controller')
@Controller('books')
export class BooksController {

  constructor(
    private readonly booksService: BooksService
  ) { }


  @ApiOperation({ summary: 'Add new book', description: 'Add a new book if already not exist' })
  @ApiResponse({ type: BooksDTO })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addBook(
    @Res() res: Response,
    @Body(new ValidationPipe(InputValidation.bookSchema)) payload: BooksDTO
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



  @ApiOperation({ summary: 'Get Books', description: 'List of all existing books' })
  @ApiResponse({ type: [BooksDTO] })
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



  @ApiOperation({ summary: 'Get Book', description: 'get the book by Book ID' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBookByID(
    @Res() res: Response,
    @Param('id') bookId: string,
    @Body(new ValidationPipe(InputValidation.bookSchema)) payload: BooksDTO
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



  @ApiOperation({ summary: 'Get Book by Search', description: 'Search the book by Title or Author' })
  @ApiResponse({ type: BooksDTO })
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




  @ApiOperation({ summary: 'Delete Book', description: 'Delete or remove the book by Book ID' })
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

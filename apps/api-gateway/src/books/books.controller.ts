import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Request, Response } from 'express';
import { BooksDTO } from '../../../books/src/dto/books.dto';
import { JwtAuthGuard } from '../../../../libs/shared-jwt/src/guards/jwt/jwt.guard';


@Controller('books')
export class BooksController {

  constructor(
    private readonly booksService: BooksService
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async addBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: BooksDTO
  ) {

    const user = req['user'];

    console.log(user)

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


}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BooksSummary } from '../../../libs/shared/src/schema/books-summary.schema';
import { Model, Types } from 'mongoose';
import { BorrowBook, ReturnBook } from './dto/borrow-return-book.dto';

@Injectable()
export class BorrowReturnBooksService {

  constructor(
    @InjectModel(BooksSummary.name) private readonly bookSummaryModel: Model<BooksSummary>
  ) { }


  async borrowBook(payload: BorrowBook) {
    try {
      const response = await this.bookSummaryModel.create(payload);

      return response ? response : null;
    } catch (error) {
      console.error(`Something went wrong atd database end`, error.message);
      return null;
    }
  }


  async isAlreadyBorrowed(payload: BorrowBook): Promise<BooksSummary> {
    try {

      const bookIds = payload.books.map(x => x.bookId);

      const filter = { userId: payload.userId, 'books.bookId': { $in: bookIds } };

      const response = await this.bookSummaryModel.findOne(filter);


      return response ? response as BooksSummary : null;

    } catch (error) {
      console.error('Something went wrong at the database end:', error.message);
      return null;
    }
  }


  async isFirstTimeBorrow(userId: string): Promise<boolean> {
    try {

      const filter = { userId: userId };

      const response = await this.bookSummaryModel.findOne(filter);

      return response ? true : false;

    } catch (error) {
      console.error('Something went wrong at the database end:', error.message);
      return null;
    }
  }


  async borrowAnotherBook(payload: BorrowBook): Promise<boolean> {
    try {

      const filter = { userId: payload.userId };

      const response = await this.bookSummaryModel.updateOne(filter,
        {
          $addToSet: {
            books: {
              $each: payload.books
            }
          }
        }
      );


      return response ? response.modifiedCount > 0 : false;

    } catch (error) {
      console.error('Something went wrong at the database end:', error.message);
      return null;
    }
  }



  async returnBook(payload: any): Promise<boolean> {
    try {

      const filter = { userId: payload.userId, 'books.bookId':payload.bookId };

      const response = await this.bookSummaryModel.updateOne(filter,
        {
          $set: {
            'books.$.returnedAt': payload.returnedAt
          }
        }
      );

      return response ? response.modifiedCount > 0 : false;
    } catch (error) {
      console.error(`Something went wrong atd database end`, error.message);
      return null;
    }
  }


  async isAlreadyReturnedBook(payload: ReturnBook): Promise<BooksSummary> {
    try {

      const filter = { userId: payload.userId, 'books.bookId': { $in: [payload.bookId] }, 'books.returned': { $exists: true } };

      console.log(filter, '---')

      const response = await this.bookSummaryModel.findOne(filter);

      return response ? response as BooksSummary : null;
    } catch (error) {
      console.error(`Something went wrong atd database end`, error.message);
      return null;
    }
  }


}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BooksSummary } from '../../../libs/shared/src/schema/books-summary.schema';
import { Model, Types } from 'mongoose';
import { BorrowBook } from './dto/borrow-return-book.dto';
import { BorrowBook as ReturnBook } from './dto/borrow-return-book.dto';

@Injectable()
export class BorrowReturnBooksService {

  constructor(
    @InjectModel(BooksSummary.name) private readonly bookSummaryModel: Model<BooksSummary>
  ) { }


  async borrowBook(payload: BorrowBook) {
    try {
      const response = await this.bookSummaryModel.create(payload);

      return response ? response as BooksSummary : null;
    } catch (error) {
      console.error(`Something went wrong atd database end`, error.message);
      return null;
    }
  }


  async isAlreadyBorrowed(payload: BorrowBook): Promise<BooksSummary> {
    try {

      const filter = { userId: payload.userId, bookId: payload.bookId };

      const response = await this.bookSummaryModel.findOne(filter);

      return response ? response as BooksSummary : null;
    } catch (error) {
      console.error(`Something went wrong atd database end`, error.message);
      return null;
    }
  }



  async returnBook(payload: ReturnBook): Promise<boolean> {
    try {

      const filter = { bookId: payload.bookId, userId: payload.userId };

      const response = await this.bookSummaryModel.updateOne(filter,
        {
          $set: {
            returnedAt: payload.returnedAt
          }
        }
      );

      console.log(response,'%%%%%%%%%%%')

      return response ? response.modifiedCount > 0 : false;
    } catch (error) {
      console.error(`Something went wrong atd database end`, error.message);
      return null;
    }
  }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BooksSummary } from '../../../libs/shared/src/schema/books-summary.schema';
import mongoose, { Model, Types } from 'mongoose';
import { BorrowBook, ReturnBook } from './dto/borrow-return-book.dto';


@Injectable()
export class BorrowReturnBooksService {

  constructor(
    @InjectModel(BooksSummary.name) private readonly bookSummaryModel: Model<BooksSummary>,
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

      const filter = {
        userId: payload.userId,
        books: {
          $elemMatch: {
            bookId: { $in: bookIds },
            returnedAt: { $eq: null }
          }
        }
      };

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

      const filter = { userId: payload.userId, 'books.bookId': payload.bookId, 'books.returnedAt': { $eq: null } };

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



  async booksBorrowedByUser(userId: string) {
    try {

      const [response] = await this.bookSummaryModel.aggregate(
        [
          // match the user 
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId)
            }
          },
          // filter out only non returedn books
          {
            $set: {
              books: {
                $filter: {
                  input: "$books",
                  as: "book",
                  cond: {
                    $not: ["$$book.returnedAt"]
                  }
                }
              }
            }
          },
          // to get the user's details
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    email: 1
                  }
                }
              ]
            }
          },
          {
            $unwind: {
              path: "$user"
            }
          },
          // to get the books detail 
          {
            $lookup: {
              from: "books",
              localField: "books.bookId",
              foreignField: "_id",
              as: "books",
              pipeline: [
                {
                  $project: {
                    bookId: '$_id',
                    title: 1,
                    author: 1,
                    publishedYear: 1,
                    _id: 0
                  }
                }
              ]
            }
          },
          {
            $project: {
              userName: "$user.name",
              userEmail: "$user.email",
              BorrowedBooks: "$books",
              _id: 0
            }
          }
        ]
      );

      // console.log(response,'=++_---')
      return response ? response : [];

    } catch (error) {
      console.error('Something went wrong at database end', error.message);
      return null;
    }
  }

}

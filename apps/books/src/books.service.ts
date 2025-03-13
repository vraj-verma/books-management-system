import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../../../libs/shared/src/schema/books.schema';
import mongoose, { Model, Schema } from 'mongoose';
import { BooksDTO } from './dto/books.dto';
import { Paged } from './types/pagination.type';

@Injectable()
export class BooksService {

  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>
  ) { }

  async createBook(payload: BooksDTO) {
    try {

      const response = await this.bookModel.create(payload);

      return response ? response as Book : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }


  async updateBookById(payload: BooksDTO): Promise<boolean> {
    try {

      const filter = { _id: payload.bookId };

      const response = await this.bookModel.updateOne(filter, payload);

      return response ? response.modifiedCount > 0 : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }


  async getBooks(paged: Paged): Promise<Book[]> {
    try {

      const searchQuery = paged.search ?
        {
          $or: [
            { title: { $regex: paged.search, $options: 'i' } },
            { author: { $regex: paged.search, $options: 'i' } },
          ],
        } :
        {};

      const response = await this.bookModel.find(searchQuery)
        .skip(paged.offset * paged.limit)
        .limit(paged.limit)
        .sort({ createdAt: -1 });

      return response ? response as Book[] : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }


  async getBookBySearch(payload: { title?: string, author?: string }): Promise<Book[]> {
    try {

      const filter = {
        $or: [
          {
            title: payload.title
          },
          {
            author: payload.author
          }
        ]
      }

      const response = await this.bookModel.aggregate(
        [
          {
            $match: filter
          }
        ]
      );

      return response ? response as Book[] : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }


  async getBookByTitle(title: string): Promise<Book> {
    try {

      const response = await this.bookModel.findOne({ title });

      return response ? response as Book : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }

  async getBookByById(bookId: mongoose.Schema.Types.ObjectId[]): Promise<Book[]> {
    try {

      const filter = { _id: { $in: bookId }, isBorrowed: true }

      const response = await this.bookModel.find(filter);

      return response && response.length > 0 ? response as Book[] : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }




  async updateBookStatus(bookIds: mongoose.Schema.Types.ObjectId[], status: boolean): Promise<boolean> {
    try {

      const response = await this.bookModel.updateMany(
        {
          _id: bookIds
        },
        {
          $set: {
            isBorrowed: status,
          },
          $inc: {
            borrowedCount: status ? 1 : 0
          }
        },

      );

      return response ? response.modifiedCount > 0 : false;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }

  async deleteBook(bookId: string): Promise<boolean> {
    try {

      const filter = { _id: bookId };

      const response = await this.bookModel.deleteOne(filter);

      return response ? response.deletedCount > 0 : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }


  async mostFrequentlyBorrowBook() {
    try {
      const [response] = await this.bookModel.aggregate(

        [
          {
            $group: {
              _id: null,
              title: { $first: "$title" },
              mostFrequently: {
                $max: "$borrowedCount"
              }
            }
          },
          {
            $project: {
              title: 1,
              mostFrequently: 1,
              _id: 0
            }
          }
        ]
      );

      return response ? response : [];
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }



  async countTotal(): Promise<number> {

    try {

      const response = await this.bookModel.countDocuments();

      return response ? response : 0;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }
}

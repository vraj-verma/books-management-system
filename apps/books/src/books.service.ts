import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../../../libs/shared-database/src/schema/books.schema';
import { Model } from 'mongoose';
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


  async updateBookById(bookId: string, payload: BooksDTO): Promise<boolean> {
    try {

      const filter = { _id: bookId };

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

      const response = await this.bookModel.find(searchQuery).skip(paged.offset * paged.limit).limit(paged.limit);

      return response ? response as Book[] : null;
    } catch (error) {
      console.error(`Something went wrong at database end`, error.message);
      return null;
    }
  }


  async getBookBySearch(title?: string, author?: string): Promise<Book> {
    try {

      const filter = {
        $or: [
          { title: { $regex: title, $options: 'i' } },
          { author: { $regex: author, $options: 'i' } },
        ]
      }

      const response = await this.bookModel.findOne(filter);

      return response ? response as Book : null;
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
}

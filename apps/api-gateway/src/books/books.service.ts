import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BooksDTO } from '../../../books/src/dto/books.dto';
import { Paged } from '../../../books/src/types/pagination.type';

@Injectable()
export class BooksService {


    constructor(
        @Inject('BOOKS_CLIENT') private readonly booksClient: ClientProxy
    ) { }


    async addBookMessage(payload: BooksDTO) {
        try {
            const response = await lastValueFrom(
                this.booksClient.send('books.add', payload)
            );
            return response;
        } catch (error) {
            console.error(`Error from Boooks Microservice:`, error.message);
            throw error;
        }
    }


    async updateBookMessage(payload: BooksDTO) {
        try {
            const response = await lastValueFrom(
                this.booksClient.send('books.updateById', payload)
            );
            return response;
        } catch (error) {
            console.error(`Error from Boooks Microservice:`, error.message);
            throw error;
        }
    }


    async GetBooksMessage(paged: Paged) {
        try {
            const response = await lastValueFrom(
                this.booksClient.send('books.getBooks', paged)
            );
            return response;
        } catch (error) {
            console.error(`Error from Boooks Microservice:`, error.message);
            throw error;
        }
    }


    async GetBookBySearchMessage(payload: { title?: string, author?: string }) {
        try {
            const response = await lastValueFrom(
                this.booksClient.send('books.getBookBySearch', payload)
            );
            return response;
        } catch (error) {
            console.error(`Error from Boooks Microservice:`, error.message);
            throw error;
        }
    }


    

    // async GetBookBySearchMessage(payload: { title?: string, author?: string }) {
    //     try {
    //         const response = await lastValueFrom(
    //             this.booksClient.send('books.getBookBySearch', payload)
    //         );
    //         return response;
    //     } catch (error) {
    //         console.error(`Error from Boooks Microservice:`, error.message);
    //         throw error;
    //     }
    // }




    async deleteBookByIdMessage(bookId: string) {
        try {
            const response = await lastValueFrom(
                this.booksClient.send('books.deleteBook', bookId)
            );
            return response;
        } catch (error) {
            console.error(`Error from Boooks Microservice:`, error.message);
            throw error;
        }
    }


}

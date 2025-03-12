import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BooksDTO } from '../../../books/src/dto/books.dto';
import { lastValueFrom } from 'rxjs';

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

}

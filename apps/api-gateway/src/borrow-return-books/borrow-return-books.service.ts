import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BorrowBook, ReturnBook } from '../../../borrow-return-books/src/dto/borrow-return-book.dto';

@Injectable()
export class BorrowReturnBooksService {

    constructor(
        @Inject('BORROW_RETURN_CLIENT') private readonly borrowReturnClient: ClientProxy,
    ) { }


    async borrowBook(payload: BorrowBook) {
        try {
            return await lastValueFrom(
                this.borrowReturnClient.send('books.borrow', payload)
            );

        } catch (error) {
            console.error(`Error from Book Summary Microservice:`, error.message);
            throw error;
        }
    }


    async returnBook(payload: ReturnBook) {
        try {
            return await lastValueFrom(
                this.borrowReturnClient.send('books.return', payload)
            );

        } catch (error) {
            console.error(`Error from Book Summary Microservice:`, error.message);
            throw error;
        }
    }

}

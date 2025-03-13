import mongoose from "mongoose";
import { BookDetail } from "../../../../libs/shared/src/schema/books-summary.schema";

export class BorrowBook {
    userId: string;
    books: BookDetail[];
}

export class ReturnBook {
    userId: string;
    bookId: mongoose.Schema.Types.ObjectId;
}
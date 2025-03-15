import mongoose from "mongoose";
import { BookDetail } from "../../../../libs/shared/src/schema/books-summary.schema";
import { ApiProperty } from "@nestjs/swagger";

export class BorrowBook {

    @ApiProperty({ type: 'string', required: true })
    userId: string;

    @ApiProperty({ type: [BookDetail], required: true })
    books: BookDetail[];
}

export class ReturnBook {

    @ApiProperty({ type: 'string', required: false })
    userId: string;

    @ApiProperty({ type: 'string', required: true })
    bookId: mongoose.Schema.Types.ObjectId;
}
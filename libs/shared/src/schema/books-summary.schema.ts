import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

export class BookDetail {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
    bookId: mongoose.Schema.Types.ObjectId;

    borrowedAt: Date;

    returnedAt: Date;
}


@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.bookSummaryId = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
})
export class BooksSummary {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: [{
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            borrowedAt: { type: Date, default: new Date().toISOString() },
            returnedAt: { type: Date, default: null }
        }], default: []
    })
    books: Array<{
        bookId: mongoose.Schema.Types.ObjectId;
        borrowedAt: Date;
        returnedAt: Date | null;
    }>;
}

export const BooksSummarySchema = SchemaFactory.createForClass(BooksSummary);


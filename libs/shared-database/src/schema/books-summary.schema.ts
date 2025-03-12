import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

class BookDetail {

    @Prop({ type: Types.ObjectId, ref: 'Book' })
    bookId: Types.ObjectId;

    @Prop({ type: Date, required: true })
    borrowedAt: Date;

    @Prop({ type: Date, default: null })
    returnedAt?: Date;
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

    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ type: [BookDetail], default: [] })
    books: BookDetail[];
}

export const BooksSummarySchema = SchemaFactory.createForClass(BooksSummary);

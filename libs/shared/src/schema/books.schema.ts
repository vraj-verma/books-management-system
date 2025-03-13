import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.bookId = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
})
export class Book {

    @Prop()
    title: string;

    @Prop()
    author: string;

    @Prop()
    genre: string;

    @Prop()
    publishedYear: number;

    @Prop()
    notes: string;

    @Prop({ default: false })
    isBorrowed: boolean;

    @Prop({ default: 0 })
    borrowedCount: number;

}

export const BooksSchema = SchemaFactory.createForClass(Book);

BooksSchema.index({ title: 1, author: 1 });
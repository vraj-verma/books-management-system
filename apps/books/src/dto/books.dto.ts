import { ApiProperty } from "@nestjs/swagger";

export class BooksDTO {

    @ApiProperty({ type: 'string', required: false })
    bookId?: string;

    @ApiProperty({ type: 'string', required: true })
    title: string;

    @ApiProperty({ type: 'string', required: true })
    author: string;

    @ApiProperty({ type: 'string', required: true })
    genre: string;

    @ApiProperty({ type: 'number', required: true })
    publishedYear: number;

    @ApiProperty({ type: 'string', required: false })
    notes: string;

}
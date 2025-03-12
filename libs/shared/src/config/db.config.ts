import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Book, BooksSchema } from "../schema/books.schema";
import { User, UsersSchema } from "../schema/users.schema";
import { BooksSummary, BooksSummarySchema } from "../schema/books-summary.schema";


export const MONGO_CONFIG = [
    MongooseModule.forRootAsync(
        {
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {

                const mongoUrl = configService.get<string>('MONGO_URL');
                const dbName = configService.get<string>('MONGO_DB');
                const maxPoolSize = 10;

                if (!mongoUrl || !dbName) {
                    throw new Error('Somwthing went wrong while importing mongo URI and db');
                }

                return {
                    uri: mongoUrl,
                    dbName: dbName,
                    maxPoolSize: maxPoolSize,
                };
            },
            inject: [ConfigService],
        }
    ),
    MongooseModule.forFeature(
        [
            {
                name: User.name,
                schema: UsersSchema
            },
            {
                name: Book.name,
                schema: BooksSchema
            },
            {
                name: BooksSummary.name,
                schema: BooksSummarySchema
            },
        ]
    )
]
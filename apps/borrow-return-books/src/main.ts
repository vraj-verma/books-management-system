import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BorrowReturnBooksModule } from './borrow-return-books.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BorrowReturnBooksModule,
    {
      transport: Transport.TCP,
      options: {
        port: 5001
      }
    }
  );

  console.info(`Book Summary Server is running on 5001`);

  await app.listen();
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BooksModule } from './books.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      transport: Transport.TCP,
      options: {
        port: 4001
      }
    }
  );

  console.info(`Books Server is running on 4001`);

  await app.listen();
}
bootstrap();

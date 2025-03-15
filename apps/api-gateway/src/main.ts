import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api/v1/');

  const config = new DocumentBuilder()
    .setTitle('Book Management System')
    .setDescription('The BMS Microservices API documentation')
    .setVersion('1.0')
    .addTag('BMS')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(7001, () => console.log(`API Gateway is running on 7001`));
}
bootstrap();

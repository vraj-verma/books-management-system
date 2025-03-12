import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api/v1/')

  await app.listen(7001, () => console.log(`API Gateway is running on 7001`));
}
bootstrap();

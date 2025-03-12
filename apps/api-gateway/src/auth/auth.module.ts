import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedJwtModule } from '../../../../libs/shared-jwt/src';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          port: 3001
        }
      }
    ]),
    SharedJwtModule

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

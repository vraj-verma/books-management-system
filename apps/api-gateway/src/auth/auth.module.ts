import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../../../../libs/shared/src';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    SharedModule

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

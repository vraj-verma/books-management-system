import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Utility } from './helper/utils.helper';
import { AuthController } from './auth.controller';
import { SharedModule } from '../../../libs/shared/src';


@Module({
  imports: [
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    Utility,
    AuthService
  ],
})
export class AuthModule { }

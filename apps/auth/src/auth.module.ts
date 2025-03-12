import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Utility } from './helper/utils.helper';
import { AuthController } from './auth.controller';
import { SharedDatabaseModule } from '../../../libs/shared-database/src';
import { SharedJwtModule } from '../../../libs/shared-jwt/src';


@Module({
  imports: [
    SharedDatabaseModule,
    SharedJwtModule
  ],
  controllers: [AuthController],
  providers: [
    Utility,
    AuthService
  ],
})
export class AuthModule { }

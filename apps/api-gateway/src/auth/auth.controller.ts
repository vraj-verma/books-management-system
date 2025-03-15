import {
  Body,
  Patch,
  Post,
  Req,
  Res,
  Delete,
  UseGuards,
  HttpStatus,
  Controller,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUser } from '../../../../libs/shared/src';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SignupDTO } from '../../../auth/src/dto/signup,dto';
import { SigninDTO } from '../../../auth/src/dto/signin.dto';
import { InputValidation } from '../validations/input.validation';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';


@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }


  @ApiOperation({ summary: 'Register Your Account', description: 'Create your account' })
  @Post('signup')
  async registerUser(
    @Res() res: Response,
    @Body(new ValidationPipe(InputValidation.signupSchema)) payload: SignupDTO
  ) {

    try {

      const response = await this.authService.register(payload);

      return res.status(201).json({
        status: true,
        response
      });
    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }

      // edge case for unknown errors
      return res.status(500).json({
        status: false,
        message: 'Somwthing went wrong'
      });
    }

  }


  @ApiOperation({ summary: 'Log in your account', description: 'Login & get JWT token' })
  @Post('signin')
  async signin(
    @Res() res: Response,
    @Body(new ValidationPipe(InputValidation.signinSchema)) payload: SigninDTO
  ) {

    try {

      const response = await this.authService.signin(payload);

      res.status(200).json(
        {
          status: true,
          response: { ...response.user, token: response.token }
        }
      );

    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }

      // Fallback for unknown errors
      return res.status(500).json({
        status: false,
        message: 'Somwthing went wrong'
      });

    }
  }



  @ApiOperation({ summary: 'Delete your account', description: 'Remove your account from the platform' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Req() req: Request,
    @Res() res: Response,
  ) {

    const { email } = <AuthUser>req['user']

    try {

      const response = await this.authService.delete(email);

      res.status(200).json(
        {
          status: true,
          response
        }
      );

    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }

      // Fallback for unknown errors
      return res.status(500).json({
        status: false,
        message: 'Somwthing went wrong'
      });

    }
  }



  @ApiOperation({ summary: 'Change your role to Admin', description: 'If you have the paascode, just simpley becaome Admin' })
  @UseGuards(JwtAuthGuard)
  @Patch('change-role')
  async udpateRole(
    @Req() req: Request,
    @Res() res: Response,
    @Body('code') code: string
  ) {

    const { email } = <AuthUser>req['user'];

    if (code !== '2804') {
      throw new HttpException(
        `Your give code is incorrect, you must have a valid code to become Admin`,
        HttpStatus.BAD_REQUEST
      )
    }

    try {

      const response = await this.authService.udpateROle(email);

      res.status(200).json(
        {
          status: true,
          response
        }
      );

    } catch (error) {

      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: false,
          message: error.message
        });
      }

      // Fallback for unknown errors
      return res.status(500).json({
        status: false,
        message: 'Somwthing went wrong'
      });

    }
  }


}

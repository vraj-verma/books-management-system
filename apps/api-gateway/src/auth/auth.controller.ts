import { Body, Controller, Delete, HttpException, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SignupDTO } from '../../../auth/src/dto/signup,dto';
import { SigninDTO } from '../../../auth/src/dto/signin.dto';
import { InputValidation } from '../validations/input.validation';
import { JwtAuthGuard } from '../../../../libs/shared/src/guards/jwt/jwt.guard';
import { AuthUser } from '../../../../libs/shared/src';



@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }


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
        `Your give code is incorrect, you musthave a valid code to become Admin`,
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

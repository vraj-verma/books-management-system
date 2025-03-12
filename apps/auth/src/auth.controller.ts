import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup,dto';
import { Utility } from './helper/utils.helper';

@Controller()
export class AuthController {

  constructor(
    private readonly utils: Utility,
    private readonly authService: AuthService
  ) { }


  @MessagePattern('auth.signup')
  async signup(
    @Payload() payload: SignupDTO
  ) {


    const isExist = await this.authService.findByEmail(payload.email);

    if (isExist) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `User with email: ${payload.email} already exists`
      });
    }

    payload.password = await this.utils.encrypt(payload.password);

    const response = await this.authService.createUser(payload);

    if (!response) {
      throw new RpcException(
        {
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: `Failed to create user at this moment, please try again`
        }
      );

    }

    return true;
  }



  @MessagePattern('auth.signin')
  async signin(
    @Payload() payload: SignupDTO
  ) {

    const user = await this.authService.findByEmail(payload.email);

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `User with email: ${payload.email} does not exists`
      });
    }


    const decryptedPassword = await this.utils.decrypt(payload.password, user.password);

    if (!decryptedPassword) {
      throw new RpcException(

        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Incorrect Password`,
        }
      );
    }


    const JWTpayload = {
      email: payload.email,
      userId: user['_id'],
      role: user.role
    }

    const token = this.utils.generateJWTToken(JWTpayload);

    user.password = undefined;

    return {
      user,
      token
    };

  }


  @MessagePattern('auth.delete')
  async delete(
    @Payload() email: string
  ) {

    const response = await this.authService.deleteByEmail(email);

    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with email: ${email} does not exists`
      });
    }

    return response;

  }




  @MessagePattern('auth.updateRole')
  async updateRole(
    @Payload() email: string
  ) {

    const response = await this.authService.updateByRoleToAdmin(email);

    if (!response) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Failed to change your role`
      });
    }

    return response;

  }

}

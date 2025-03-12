import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SignupDTO } from '../../../auth/src/dto/signup,dto';
import { SigninDTO } from '../../../auth/src/dto/signin.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
    ) { }

    async register(payload: SignupDTO) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.signup', payload)
            );
            return response;
        } catch (error) {
            console.error(`Error from Auth Microservice:`, error.message);

            // re throw the error to send it to the controller
            throw error;
        }
    }


    async signin(payload: SigninDTO) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.signin', payload)
            );

            return response;
        } catch (error) {
            console.error(`Error from Auth Microservice:`, error.message);
            throw error;
        }
    }


    async delete(email: string) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.delete', email)
            );

            return response;
        } catch (error) {
            console.error(`Error from Auth Microservice:`, error.message);
            throw error;
        }
    }

    async udpateROle(email: string) {
        try {
            const response = await lastValueFrom(
                this.authClient.send('auth.updateRole', email)
            );

            return response;
        } catch (error) {
            console.error(`Error from Auth Microservice:`, error.message);
            throw error;
        }
    }
}

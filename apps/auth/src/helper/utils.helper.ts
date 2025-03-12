import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
import * as bcrypt from 'bcrypt';


@Injectable()
export class Utility {

    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async encrypt(str: string) {
        try {
            const salt = await bcrypt.genSalt(7);
            return await bcrypt.hash(str, salt);
        } catch (error) {
            console.error(`Something went wrong while encrtypting`, error.message);
            return null;
        }
    }

    async decrypt(compareTo: string, compareWith: string) {
        try {
            return await bcrypt.compare(compareTo, compareWith);
        } catch (error) {
            console.error(`Something went wrong while decrypting`, error.message)
            return null;
        }
    }


    generateJWTToken(payload: any) {
        try {
            return this.jwtService.sign(payload);
        } catch (error) {
            throw new RpcException(
                {
                    statusCode: HttpStatus.NOT_IMPLEMENTED,
                    message: `Something went wrong, while generating JWT token, ${error.message}`,
                }
            );
        }
    }

    async verifyJWTToken(token: string) {
        try {
            return await this.jwtService.verify(token);
        } catch (error) {
            throw new RpcException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Token expired or invalid',
                }
            );
        }
    }

}
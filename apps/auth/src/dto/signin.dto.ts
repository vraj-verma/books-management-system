import { ApiProperty } from "@nestjs/swagger";

export class SigninDTO {

    @ApiProperty({ type: 'string' })
    email: string;

    @ApiProperty({ type: 'string' })
    password: string;
}
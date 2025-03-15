import { ApiProperty } from "@nestjs/swagger";

export class SignupDTO {

    @ApiProperty({ type: 'string' })
    name: string;

    @ApiProperty({ type: 'string' })
    email: string;

    @ApiProperty({ type: 'string' })
    password: string;
}
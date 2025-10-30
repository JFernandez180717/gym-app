import { ApiProperty } from "@nestjs/swagger";

export class LoginModel {
    @ApiProperty()
    access_token: string;
}
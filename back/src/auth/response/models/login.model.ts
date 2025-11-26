import { ApiProperty } from "@nestjs/swagger";

export class LoginModel {
    @ApiProperty()
    user: Object;

    @ApiProperty()
    roles: [];
}
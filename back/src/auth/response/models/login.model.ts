import { ApiProperty } from "@nestjs/swagger";
import { UserLoginResponseModel } from "./user-login-response.model";

export class LoginModel {
    @ApiProperty()
    user: UserLoginResponseModel;

    @ApiProperty()
    roles: [];
}
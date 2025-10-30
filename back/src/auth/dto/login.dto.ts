import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El correo electronico no puede estar vacío' })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;
}
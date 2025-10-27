import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'El correo electronico no puede estar vacío' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string;
}
import { IsDate, IsEmail, IsNotEmpty } from "class-validator";

export class AssingRoleUser {

    @IsNotEmpty({ message: 'El id del gimnasio no puede estar vacío.' })
    gymId: number;

    @IsNotEmpty({ message: 'El correo electronico no puede estar vacío' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'El rol no puede estar vacío' })
    role_id: string;

    @IsDate()
    createdDate?: Date;

    @IsNotEmpty({ message: 'El usuario que asigna el rol no puede estar vacío' })
    @IsEmail()
    createdBy: string;
}
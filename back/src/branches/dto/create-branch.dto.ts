import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, MaxLength } from "class-validator";

export class CreateBranchDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
    @MaxLength(255, { message: 'La dirección debe contener máximo 255 caracteres' } )
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El telefono no puede estar vacío' })
    @MaxLength(20, { message: 'El telefono debe contener máximo 20 caracteres.' } )
    phone: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El usuario que crea la sede no puede estar vacío' })
    @IsEmail({}, { message: 'El correo electronico no es válido' } )
    createdBy: string
}
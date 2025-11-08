import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El id de la empresa no puede estar vacío' })
    @IsInt({ message: 'El id de la empresa debe ser un numero' })
    companyId: number;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'El id de la sede no puede estar vacío' })
    @IsInt({ message: 'El id de la sede debe ser un numero' })
    branchId: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El correo electronico no puede estar vacío' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    @MinLength(6, { message: 'La contraseña debe contener mínimo 6 caracteres' })
    @MaxLength(30, { message: 'La contraseña debe contener maximo 30 caracteres' })
    password?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    @MinLength(3, { message: 'El nombre debe contener minimo 3 caracteres' })
    @MaxLength(30, { message: 'El nombre debe contener maximo 30 caracteres' })
    firstName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
    @MinLength(3, { message: 'El apellido debe contener minimo 3 caracteres' })
    @MaxLength(30, { message: 'El apellido debe contener maximo 30 caracteres' })
    lastName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty({ message: 'El estado no puede estar vacio' })
    @IsIn([0, 1], { message: 'El estado debe estar entre 0 y 1' })
    status: number;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({ message: 'El usuario que modifica no puede estar vacío' })
    modifiedBy: string;
}
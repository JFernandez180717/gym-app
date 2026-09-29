import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

@ApiSchema({ name: 'CreateRoleRequest', description: 'Description of CreateRoleRequest' })
export class CreateRoleDto {
    @ApiProperty()
    @IsInt({ message: 'El id de la empresa debe ser un valor numerico' })
    @IsNotEmpty({ message: 'El id de la empresa no puede estar vacío' })
    companyId: number;
    
    @ApiProperty()
    @IsInt({ message: 'El id de la sede debe ser un valor numerico' })
    @IsNotEmpty({ message: 'El id de la sede no puede estar vacío' })
    branchId: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo role no puede estar vacío.' })
    @MaxLength(20, { message: 'El campo role no puede ser de mas de 20 caracteres' })
    role: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripción no puede estar vacío' })
    @MaxLength(60, { message: 'El campo descripción no puede ser de mas de 60 caracteres.' })
    description: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    createdDate?: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'El usuario que crea el rol no puede estar vacío' })
    @IsEmail()
    createdBy: string;
}
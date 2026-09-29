import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional } from "class-validator";

@ApiSchema({ name: "AssginRoleUserRequest", description: "Description of the AssginRoleUserRequest" })
export class AssingRoleUser {

    @ApiProperty()
    @IsInt({ message: 'El id de la empresa debe ser un numero' })
    @IsNotEmpty({ message: 'El id de la empresa no puede estar vacío.' })
    companyId: number;
    
    @ApiProperty()
    @IsInt({ message: 'El id de la sede debe ser un numero' })
    @IsNotEmpty({ message: 'El id de la sede no puede estar vacío.' })
    branchId: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El correo electronico no puede estar vacío' })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El rol no puede estar vacío' })
    roleName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    createdDate?: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'El usuario que asigna el rol no puede estar vacío' })
    @IsEmail()
    createdBy: string;
}
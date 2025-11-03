import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsInt, MaxLength, IsDate, IsIn } from 'class-validator';

@ApiSchema({ name: "CreateUserRequest", description: "Description of the CreateUserRequest" })
export class CreateUserDto {
  @ApiProperty()
  @IsInt({ message: 'El id del Gimnasio debe ser un numero' })
  @IsNotEmpty({ message: 'El id del Gimnasio no puede estar vacío' })
  gymId: number;

  @ApiProperty()
  @IsEmail()
  @MinLength(7, { message: 'El correo electronico debe contener minimo 7 caracteres' })
  @MaxLength(100, { message: 'El correo electronico debe contener maximo 100 caracteres' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe contener mínimo 6 caracteres' })
  @MaxLength(30, { message: 'La contraseña debe contener maximo 30 caracteres' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @MinLength(3, { message: 'El nombre debe contener minimo 3 caracteres' })
  @MaxLength(30, { message: 'El nombre debe contener maximo 30 caracteres' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
  @MinLength(3, { message: 'El apellido debe contener minimo 3 caracteres' })
  @MaxLength(30, { message: 'El apellido debe contener maximo 30 caracteres' })
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty({ message: 'El estado no puede estar vacio' })
  @IsIn([0, 1], { message: 'El estado debe estar entre 0 y 1' })
  status: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  createdDate?: Date
}

import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsInt, MaxLength, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsInt({ message: 'El id del Gimnasio debe ser un numero' })
  @IsNotEmpty({ message: 'El id del Gimnasio no puede estar vacío' })
  gymId: number;

  @IsEmail()
  @MinLength(7, { message: 'El correo electronico debe contener minimo 7 caracteres' })
  @MaxLength(100, { message: 'El correo electronico debe contener maximo 100 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe contener mínimo 6 caracteres' })
  @MaxLength(30, { message: 'La contraseña debe contener maximo 30 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @MinLength(3, { message: 'El nombre debe contener minimo 3 caracteres' })
  @MaxLength(30, { message: 'El nombre debe contener maximo 30 caracteres' })
  firstName: string;

  @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
  @MinLength(3, { message: 'El apellido debe contener minimo 3 caracteres' })
  @MaxLength(30, { message: 'El apellido debe contener maximo 30 caracteres' })
  lastName: string;

  @IsOptional()
  phoneNumber?: string;

  @IsInt()
  @IsNotEmpty({ message: 'El estado no puede estar vacio' })
  status: number;

  @IsOptional()
  @IsDate()
  createdDate?: Date
}

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    if (!user || !user.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return this.usersService.create(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.gym_id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}

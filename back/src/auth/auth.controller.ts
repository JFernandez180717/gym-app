import { Controller, Post, Body, Res, HttpStatus, HttpException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUserModel } from 'src/users/response/models/get-users.model';
import { LoginModel } from 'src/auth/response/models/login.model';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  //@Roles('ADMIN')
  @ApiResponse({
    status: 201,
    type: ApiResponseModel(GetUserModel)
  })
  //@ApiBearerAuth()
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const newUser = await this.authService.register(user);
    return newUser;
  }

  @Public()
  @ApiResponse({ 
    type: ApiResponseModel(LoginModel)
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const resp = await this.authService.login(loginDto);
    const token = resp.access_token;

    res.cookie('auth_token', token, {
      httpOnly: true, 
      secure: false, //en produccion true
      sameSite: 'lax', //en produccion none
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user: resp.user, roles: resp.roles };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    return { message: 'Sesión cerrada' };
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validate() {
    return { valid: true };
  }
}

import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUserModel } from 'src/users/response/models/get-users.model';
import { LoginModel } from 'src/auth/response/models/login.model';
import { ApiResponseModel } from 'src/common/response/models/api-response.model';
import { Roles } from 'src/common/decorators/roles.decorator';

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
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

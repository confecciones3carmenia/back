import { Controller, Post, Body, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/index';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './entities/auth.entity';
import { AuthValidate } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('check-status')
  @AuthValidate()
  checkAuthStatus(@GetUser() userAuth: Auth) {
    return this.authService.checkAuthStatus(userAuth);
  }
}

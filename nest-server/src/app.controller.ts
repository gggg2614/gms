import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() createAdminDto:any) {
  return this.authService.login(createAdminDto);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/loginStu')
  async loginStu(@Body() createAdminDto:any) {
  return this.authService.loginStu(createAdminDto);
  }
}

import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
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
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async profile(@Request() req) {
    return {}
  }

}

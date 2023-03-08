import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string) {
    const user = await this.adminService.findOne(username);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(loginDto) {
    const user: any = await this.validateAdmin(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user._doc.username, sub: user._doc._id };
    console.log(user._doc);
    return {
      data: {
        accessToken: this.jwtService.sign(payload),
        username: payload.username,
        roles: ['admin'],
        expires: '2023/10/30 00:00:00',
      },
      success:true
    };
  }
}

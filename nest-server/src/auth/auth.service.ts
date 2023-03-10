import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { StudentService } from '../student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private studentService: StudentService
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

  async validateStudent(email: string, phone:string) {
    const user = await this.studentService.findByMail(email);
    
    if (user && (await (phone ===user.phone))) {
      const { phone, ...result } = user;
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
  async loginStu(loginDto) {
    const user: any = await this.validateStudent(
      loginDto.email,
      loginDto.password,
      );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user._doc.email, sub: user._doc._id };
    return {
      data: {
        accessToken: this.jwtService.sign(payload),
        email: user._doc.email,
        stuname: user._doc.stuname,
        stuindustry:user._doc.industry,
        roles: ['admin'],
        expires: '2023/10/30 00:00:00',
      },
      success:true
    };
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './strategy/local.strategy';
import { Admin, AdminSchema } from '../admin/entities/admin.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from '../admin/admin.service';
import { Student, StudentSchema } from '../student/entities/student.entity';
import { StudentService } from '../student/student.service';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, AdminService, LocalStrategy, JwtStrategy,StudentService],
  exports: [AuthService],
})
export class AuthModule {}

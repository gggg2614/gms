import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.path === '/auth/login' || request.path === '/auth/loginStu') {
      return true; // 允许访问登录接口
    }
    return super.canActivate(context); // 其他路由需要进行身份验证
  }
}

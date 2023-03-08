import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { HttpExceptionFilter } from './filter/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api')
  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard())
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/gms'),StudentModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

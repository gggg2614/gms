import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':_id')
  findById(@Param('_id') _id: string) {
    return this.companyService.findById(_id);
  }

  @Header('Cache-Control', 'max-age=10')
  @Get(':comname')
  findOne(@Param('comname') comname: string) {
    return this.companyService.findOne(comname);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  @InjectModel(Company.name)
  private readonly companyModel: Model<CompanyDocument>;
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file) {
    const data = await this.companyService.importExcel(file.buffer);
    // const newData = data.map((item)=>new this.companyModel(item))
    const newData = data
      .map((item) => [
        {
          comname: item.column_1,
          comjob: item.column_2,
          comsalary: item.column_3,
          industry: item.column_4,
          comaria: item.column_5,
        },
      ])
      .flat();
    await this.companyModel.insertMany(newData);
    return { data };
  }
}

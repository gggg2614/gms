import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const createdCompanyDto = await this.companyModel.create(createCompanyDto);
    return createdCompanyDto;
  }

  findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  findOne(comname: string): Promise<Company[]> {
    return this.companyModel.find({ comname: { $regex: comname } }).exec();
  }

  findById(_id: string): Promise<Company[]> {
    return this.companyModel.find({ _id: { _id } }).exec();
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto)
      .exec();
    return updatedCompany;
  }

  async remove(id: string) {
    const deletedCompany = await this.companyModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCompany;
  }
  
  async importExcel(fileBuffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.getWorksheet(1);
    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[`column_${colNumber}`] = cell.value;
        });
        data.push(rowData);
      }
    });
    return data
  }

  async exportExcel(filename) {
    try {
    } catch (error) {
      return error;
    }
  }
}

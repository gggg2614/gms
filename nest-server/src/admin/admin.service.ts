import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const salt = await genSalt()
    createAdminDto.password = await hash(createAdminDto.password, salt)
    const createdAdminDto = await this.adminModel.create(createAdminDto);
    return createdAdminDto;
  }

  findAll() {
    return this.adminModel.find().exec();
  }

  findOne(username:string) {
    return this.adminModel.findOne({username:username}).exec()
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}

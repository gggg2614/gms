import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './entities/student.entity';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const createdStudentDto = await this.studentModel.create(createStudentDto);
    return createdStudentDto;
  }

  findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  findOne(phone: string): Promise<Student[]> {
    return this.studentModel.find({ phone: { $regex: phone } }).exec();
  }

  findByMail(email: string) {
    return this.studentModel.findOne({ email:email }).exec();
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto)
      .exec();
    return updatedStudent;
  }

  async remove(id: string) {
    const deletedStudent = await this.studentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedStudent;
  }
}

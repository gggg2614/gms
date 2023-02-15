import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StudentDocument = HydratedDocument<Student>

@Schema()
export class Student {
    @Prop()
    stuname: string
    @Prop()
    stuclass: string
    @Prop()
    gender: string
    @Prop()
    idcard: number
    @Prop()
    stuprofession: string
    @Prop()
    email: string
    @Prop()
    address: string
    @Prop()
    workplace: string
    @Prop()
    salary: number
    @Prop()
    job: string
    @Prop()
    industry: string
}

export const StudentSchema = SchemaFactory.createForClass(Student)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CompanyDocument = HydratedDocument<Company>

@Schema()
export class Company {
    @Prop()
    comname: string
    @Prop()
    comaria: Array<string>
    @Prop()
    comsalary: string
    @Prop()
    comjob: string
    @Prop()
    industry: Array<string>
    @Prop()
    detail: string
    @Prop()
    phone: number
}

export const CompanySchema = SchemaFactory.createForClass(Company);
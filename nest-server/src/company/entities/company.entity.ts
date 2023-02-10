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
    comsalary: number
    @Prop()
    comjob: string
}

export const CompanySchema = SchemaFactory.createForClass(Company);
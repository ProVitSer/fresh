import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ApiDocument = Api & Document;

//@Schema({ versionKey: false ,timestamps: { createdAt: 'uploadAt' }})
@Schema({ versionKey: false })
export class Api {
  @Prop()
  fieldname: string;

  @Prop()
  originalname: string;

  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  destination: string;

  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop()
  size: number;

  @Prop()
  fileState: string;

  @Prop({ default: Date.now })
  uploadAt: Date;

  @Prop()
  workerId: number;

  @Prop()
  processPid: number;
}

export const ApiSchema = SchemaFactory.createForClass(Api);

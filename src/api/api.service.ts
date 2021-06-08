import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Api, ApiDocument } from "./schemas/api.schema";
import { Cron } from "@nestjs/schedule";
import * as fs from "fs";

@Injectable()
export class ApiService {
  constructor(@InjectModel(Api.name) private apiModel: Model<ApiDocument>) {}

  @Cron("15 23 * * *")
  async deleteCollection() {
    if (+process.env.CLUSTER_NUM == 1) {
      const result = await this.apiModel.find({ fileState: "delete" }).exec();
      for (let { filename } of result) {
        await fs.promises.unlink(
          `./${process.env.UPLOAD_LOCATION}/${filename}`
        );
        await this.apiModel.deleteOne({ filename: filename });
      }
    }
  }

  async findAll(): Promise<any> {
    return await this.apiModel
      .find({}, { originalname: 1, size: 1, uploadAt: 1, _id: 0 })
      .sort({ uploadAt: 1 })
      .limit(5)
      .exec();
  }

  async uploadFile(file: any): Promise<any> {
    const resultSearch = await this.apiModel
      .find({ originalname: file.originalname })
      .exec();
    if (resultSearch.length == 0) {
      const uploadFile = new this.apiModel({ ...file });
      const result = await uploadFile.save();
      return result;
    }
    return false;
  }

  async deleteByName(originalname: string): Promise<any> {
    const result = await this.apiModel.updateOne(
      { originalname: originalname },
      { $set: { fileState: "delete" } }
    );
    if (result.nModified == 0) {
      return false;
    }
    return await this.apiModel.find({ originalname: originalname }).exec();
  }
}

import { Model } from "mongoose";
import { ApiDocument } from "./schemas/api.schema";
export declare class ApiService {
    private apiModel;
    constructor(apiModel: Model<ApiDocument>);
    deleteCollection(): Promise<void>;
    findAll(): Promise<any>;
    uploadFile(file: any): Promise<any>;
    deleteByName(originalname: string): Promise<any>;
}

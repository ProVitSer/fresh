import { Document } from "mongoose";
export declare type ApiDocument = Api & Document;
export declare class Api {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
    fileState: string;
    uploadAt: Date;
    workerId: number;
    processPid: number;
}
export declare const ApiSchema: import("mongoose").Schema<Document<Api, any>, import("mongoose").Model<any, any, any>, undefined>;

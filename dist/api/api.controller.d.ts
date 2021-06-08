import { ApiService } from "./api.service";
import { FileDeleteDto } from "./dto/api-delete.dto";
import { Logger } from "winston";
export declare class ApiController {
    private apiService;
    private readonly logger;
    constructor(apiService: ApiService, logger: Logger);
    getAll(): Promise<any[]>;
    uploadFile(file: any, res: any): Promise<any>;
    deleteByName(body: FileDeleteDto, res: any): Promise<any>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_config_1 = require("../config/multer.config");
const api_service_1 = require("./api.service");
const api_delete_dto_1 = require("./dto/api-delete.dto");
const nest_winston_1 = require("nest-winston");
let ApiController = class ApiController {
    constructor(apiService, logger) {
        this.apiService = apiService;
        this.logger = logger;
    }
    async getAll() {
        return await this.apiService.findAll();
    }
    async uploadFile(file, res) {
        file.processPid = process.pid;
        file.workerId = process.env.CLUSTER_NUM;
        file.fileState = "add";
        const result = await this.apiService.uploadFile(file);
        if (result == false) {
            res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                message: "The file has already been uploaded to the server",
            });
        }
        else {
            this.logger.info({
                ObjectID: result._id,
                ClusterId: result.workerId,
                Stamp: result.uploadAt,
                Type: result.fileState,
            });
            res.status(common_1.HttpStatus.OK).json({
                message: "File uploaded successfully",
            });
        }
    }
    async deleteByName(body, res) {
        const { originalname } = body;
        const result = await this.apiService.deleteByName(originalname);
        if (result == false) {
            res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: "The file is marked for deletion or absent on the server",
            });
        }
        else {
            this.logger.info({
                ObjectID: result[0]._id,
                ClusterId: result[0].workerId,
                Stamp: result[0].uploadAt,
                Type: result[0].fileState,
            });
            res.status(common_1.HttpStatus.OK).json({
                message: "File modify to delete successfully",
            });
        }
    }
};
__decorate([
    swagger_1.ApiTags("getall"),
    swagger_1.ApiOkResponse({
        description: "Retrieved last 5 upload file sort by upload date",
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: "Internal server error",
    }),
    common_1.Get("getall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getAll", null);
__decorate([
    swagger_1.ApiTags("upload"),
    swagger_1.ApiConsumes("multipart/form-data"),
    swagger_1.ApiOkResponse({
        description: "File uploaded successfully",
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: "Internal server error",
    }),
    swagger_1.ApiCreatedResponse({
        status: 422,
        description: "The file has already been uploaded to the server",
    }),
    swagger_1.ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    common_1.Post("upload"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("file", multer_config_1.multerOptions)),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "uploadFile", null);
__decorate([
    swagger_1.ApiTags("delete"),
    swagger_1.ApiOkResponse({
        description: "File uploaded successfully",
    }),
    swagger_1.ApiInternalServerErrorResponse({
        description: "Internal server error",
    }),
    swagger_1.ApiNotFoundResponse({
        description: "The file is marked for deletion or absent on the server",
    }),
    common_1.Delete("delete"),
    common_1.UsePipes(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_delete_dto_1.FileDeleteDto, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "deleteByName", null);
ApiController = __decorate([
    common_1.Controller("api"),
    __param(1, common_1.Inject(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [api_service_1.ApiService, Object])
], ApiController);
exports.ApiController = ApiController;
//# sourceMappingURL=api.controller.js.map
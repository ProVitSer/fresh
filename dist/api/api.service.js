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
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_schema_1 = require("./schemas/api.schema");
const schedule_1 = require("@nestjs/schedule");
const fs = require("fs");
let ApiService = class ApiService {
    constructor(apiModel) {
        this.apiModel = apiModel;
    }
    async deleteCollection() {
        if (+process.env.CLUSTER_NUM == 1) {
            const result = await this.apiModel.find({ fileState: "delete" }).exec();
            for (let { filename } of result) {
                await fs.promises.unlink(`./${process.env.UPLOAD_LOCATION}/${filename}`);
                await this.apiModel.deleteOne({ filename: filename });
            }
        }
    }
    async findAll() {
        return await this.apiModel
            .find({}, { originalname: 1, size: 1, uploadAt: 1, _id: 0 })
            .sort({ uploadAt: 1 })
            .limit(5)
            .exec();
    }
    async uploadFile(file) {
        const resultSearch = await this.apiModel
            .find({ originalname: file.originalname })
            .exec();
        if (resultSearch.length == 0) {
            const uploadFile = new this.apiModel(Object.assign({}, file));
            const result = await uploadFile.save();
            return result;
        }
        return false;
    }
    async deleteByName(originalname) {
        const result = await this.apiModel.updateOne({ originalname: originalname }, { $set: { fileState: "delete" } });
        if (result.nModified == 0) {
            return false;
        }
        return await this.apiModel.find({ originalname: originalname }).exec();
    }
};
__decorate([
    schedule_1.Cron("15 23 * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiService.prototype, "deleteCollection", null);
ApiService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(api_schema_1.Api.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map
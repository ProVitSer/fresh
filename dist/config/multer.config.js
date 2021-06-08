"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = exports.multerConfig = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const api_config_1 = require("./api.config");
exports.multerConfig = {
    dest: api_config_1.ApiConfig.production.location,
};
exports.multerOptions = {
    limits: {
        fileSize: api_config_1.ApiConfig.production.maxFileSize,
    },
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png|xlsx)$/)) {
            return callback(new common_1.HttpException("Некорректный формат файла. Разрешены только jpg, png, xlsx", common_1.HttpStatus.BAD_REQUEST), false);
        }
        callback(null, true);
    },
    storage: multer_1.diskStorage({
        destination: (req, file, callback) => {
            const uploadPath = exports.multerConfig.dest;
            if (!fs_1.existsSync(uploadPath)) {
                fs_1.mkdirSync(uploadPath);
            }
            callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
            callback(null, `${uuid_1.v4()}${path_1.extname(file.originalname)}`);
        },
    }),
};
//# sourceMappingURL=multer.config.js.map
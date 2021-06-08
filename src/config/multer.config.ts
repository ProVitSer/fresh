import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { ApiConfig } from "./api.config";

export const multerConfig = {
  dest: ApiConfig.production.location,
};

export const multerOptions = {
  limits: {
    fileSize: ApiConfig.production.maxFileSize,
  },
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|png|xlsx)$/)) {
      return callback(
        new HttpException(
          "Некорректный формат файла. Разрешены только jpg, png, xlsx",
          HttpStatus.BAD_REQUEST
        ),
        false
      );
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: (req: any, file: any, callback: any) => {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (req: any, file: any, callback: any) => {
      callback(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

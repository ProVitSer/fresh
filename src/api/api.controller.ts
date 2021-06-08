import {
    Controller,
    Res,
    Get,
    Post,
    Delete,
    Body,
    UseInterceptors,
    UploadedFile,
    UsePipes,
    HttpStatus,
    Inject,
  } from "@nestjs/common";
  import { FileInterceptor } from "@nestjs/platform-express";
  import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiTags,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
  } from "@nestjs/swagger";
  import { multerOptions } from "../config/multer.config";
  import { ApiService } from "./api.service";
  import { FileDeleteDto } from "./dto/api-delete.dto";
  import { WINSTON_MODULE_PROVIDER } from "nest-winston";
  import { Logger } from "winston";
  
  @Controller("api")
  export class ApiController {
    constructor(
      private apiService: ApiService,
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}
  
    @ApiTags("getall")
    @ApiOkResponse({
      description: "Retrieved last 5 upload file sort by upload date",
    })
    @ApiInternalServerErrorResponse({
      description: "Internal server error",
    })
    @Get("getall")
    async getAll(): Promise<any[]> {
      return await this.apiService.findAll();
    }
  

    @ApiTags("upload")
    @ApiConsumes("multipart/form-data")
    @ApiOkResponse({
      description: "File uploaded successfully",
    })
    @ApiInternalServerErrorResponse({
      description: "Internal server error",
    })
    @ApiCreatedResponse({
      status: 422,
      description: "The file has already been uploaded to the server",
    })
    @ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    })
    @Post("upload")
    @UseInterceptors(FileInterceptor("file", multerOptions))
    //async uploadFile( @UploadedFile() file, @Body() body : FileUploadDto, @Res() res) : Promise<any>{
    async uploadFile(@UploadedFile() file, @Res() res): Promise<any> {
      file.processPid = process.pid;
      file.workerId = process.env.CLUSTER_NUM;
      file.fileState = "add";
  
      const result = await this.apiService.uploadFile(file);
  
      if (result == false) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: "The file has already been uploaded to the server",
        });
      } else {
        this.logger.info({
          ObjectID: result._id,
          ClusterId: result.workerId,
          Stamp: result.uploadAt,
          Type: result.fileState,
        });
        res.status(HttpStatus.OK).json({
          message: "File uploaded successfully",
        });
      }
    }
  
    
    @ApiTags("delete")
    @ApiOkResponse({
      description: "File uploaded successfully",
    })
    @ApiInternalServerErrorResponse({
      description: "Internal server error",
    })
    @ApiNotFoundResponse({
      description: "The file is marked for deletion or absent on the server",
    })
    @Delete("delete")
    @UsePipes()
    async deleteByName(@Body() body: FileDeleteDto, @Res() res): Promise<any> {
      const { originalname } = body;
      const result = await this.apiService.deleteByName(originalname);
      if (result == false) {
        res.status(HttpStatus.NOT_FOUND).json({
          message: "The file is marked for deletion or absent on the server",
        });
      } else {
        this.logger.info({
          ObjectID: result[0]._id,
          ClusterId: result[0].workerId,
          Stamp: result[0].uploadAt,
          Type: result[0].fileState,
        });
        res.status(HttpStatus.OK).json({
          message: "File modify to delete successfully",
        });
      }
    }
  }
  
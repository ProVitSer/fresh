import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { Api, ApiSchema } from "./schemas/api.schema";
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from "nest-winston";
import * as winston from "winston";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Api.name,
        schema: ApiSchema,
      },
    ]),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: `logs/logs.txt`,
        }),
      ],
    }),
  ],
})
export class ApiModule {}

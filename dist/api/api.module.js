"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const api_controller_1 = require("./api.controller");
const api_service_1 = require("./api.service");
const api_schema_1 = require("./schemas/api.schema");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const schedule_1 = require("@nestjs/schedule");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        providers: [api_service_1.ApiService],
        controllers: [api_controller_1.ApiController],
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: api_schema_1.Api.name,
                    schema: api_schema_1.ApiSchema,
                },
            ]),
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.File({
                        filename: `logs/logs.txt`,
                    }),
                ],
            }),
        ],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map
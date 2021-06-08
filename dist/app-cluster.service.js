"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppClusterService = void 0;
const cluster = require("cluster");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
dotenv.config();
const numCPUs = +process.env.CLUSTER_NUM;
let AppClusterService = class AppClusterService {
    static clusterize(callback) {
        if (cluster.isMaster) {
            for (let i = 0; i < numCPUs; i++) {
                process.env.CLUSTER_NUM = `${i + 1}`;
                console.log(`Master сервер  номер PID процесса ${process.pid}`);
                console.log(`${process.env.CLUSTER_NUM}`);
                cluster.fork();
            }
            cluster.on("exit", (worker) => {
                console.log(`worker ${worker.process.pid} died`);
                cluster.fork();
            });
        }
        else {
            callback();
        }
    }
};
AppClusterService = __decorate([
    common_1.Injectable()
], AppClusterService);
exports.AppClusterService = AppClusterService;
//# sourceMappingURL=app-cluster.service.js.map
import * as cluster from "cluster";
import * as dotenv from "dotenv";
import { Injectable } from "@nestjs/common";
dotenv.config();
const numCPUs: number = +process.env.CLUSTER_NUM;

@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
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
    } else {
      callback();
    }
  }
}

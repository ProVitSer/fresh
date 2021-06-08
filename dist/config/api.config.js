"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.ApiConfig = {
    production: {
        mongoUsername: process.env.MONGODB_USER,
        mongoPass: process.env.MONGODB_PASS,
        mongoIp: process.env.MONGODB_IP,
        mongoPort: process.env.MONGODB_PORT,
        mongoCollection: process.env.MONGODB_COLLECTION,
        location: process.env.UPLOAD_LOCATION,
        maxFileSize: +process.env.MAX_FILE_SIZE,
        clusterNum: process.env.CLUSTER_NUM,
        apiPort: +process.env.PORT,
    },
};
//# sourceMappingURL=api.config.js.map
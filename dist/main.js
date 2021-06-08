"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const app_cluster_service_1 = require("./app-cluster.service");
const api_config_1 = require("./config/api.config");
async function bootstrap() {
    const port = api_config_1.ApiConfig.production.apiPort;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Тестовое задание API Back")
        .setDescription("API для загрузки файлов формата jpg, png, xlsx (не более 5М), выгрузки всех загруженных файлов и выставлением метки на удаление.\n Ежедневно в 23:30 по cron происходит удаление файлов помеченных как delete")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.enableCors({
        origin: '*',
        methods: "GET,POST,DELETE,OPTIONS",
        allowedHeaders: "Content-Type, Accept,",
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    await app.listen(port);
}
app_cluster_service_1.AppClusterService.clusterize(bootstrap);
//# sourceMappingURL=main.js.map
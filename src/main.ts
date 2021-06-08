import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AppClusterService } from "./app-cluster.service";
import { ApiConfig } from "./config/api.config";

async function bootstrap() {
  const port = ApiConfig.production.apiPort;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("Тестовое задание API Back")
    .setDescription(
      "API для загрузки файлов формата jpg, png, xlsx (не более 5М), выгрузки всех загруженных файлов и выставлением метки на удаление.\n Ежедневно в 23:30 по cron происходит удаление файлов помеченных как delete"
    )
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    //origin: `http://localhost:${ApiConfig.production.apiPort}`,
    origin: '*',
    methods: "GET,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Accept,",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  await app.listen(port);
}
AppClusterService.clusterize(bootstrap);

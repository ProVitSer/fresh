import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ApiConfig } from './config/api.config';
//import { Api } from './api/schemas/api.schema';



@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${ApiConfig.production.mongoIp}:${ApiConfig.production.mongoPort}/${ApiConfig.production.mongoCollection}`), 
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

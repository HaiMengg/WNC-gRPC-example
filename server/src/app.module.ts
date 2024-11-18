import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorsModule } from './modules/actors/actors.module';
import { DatabaseModule } from './shared/database/database.module';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ActorsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

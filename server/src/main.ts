import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ACTORS_SERVICE_NAME } from './proto/actor.pb';
import { grpcClientOptions } from './utils/grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservices();
}
bootstrap();

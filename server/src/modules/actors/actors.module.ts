import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Actor } from "../../models/actors.model";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ACTORS_SERVICE_NAME } from "src/proto/actor.pb";
import { ActorsController } from "./actors.controller";
import { grpcClientOptions } from "src/utils/grpc-client.options";

@Module({
    imports: [
        SequelizeModule.forFeature([Actor]),
        ClientsModule.register([
            {
                name: 'ACTORS_PACKAGE',
                ...grpcClientOptions
            },
        ]),
    ],
    controllers: [ActorsController]
})
export class ActorsModule {}
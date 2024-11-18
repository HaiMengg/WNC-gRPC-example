import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { ACTOR_PACKAGE_NAME, ACTORS_SERVICE_NAME } from "src/proto/actor.pb";
import { ActorsController } from "./actors.controller";
import { grpcClientOptions } from "src/utils/grpc-client.options";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ACTORS_PACKAGE',
                ...grpcClientOptions
            },
        ])
    ],
    controllers: [ActorsController]
})
export class ActorsModule {}
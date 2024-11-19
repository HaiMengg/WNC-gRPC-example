import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
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
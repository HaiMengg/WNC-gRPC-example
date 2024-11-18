import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ACTOR_PACKAGE_NAME } from 'src/proto/actor.pb';

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ACTOR_PACKAGE_NAME,
    protoPath: 'src/proto/actor.proto'
  },
};
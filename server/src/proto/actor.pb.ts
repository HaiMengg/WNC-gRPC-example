// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               v5.29.0
// source: src/proto/actor.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../../google/protobuf/timestamp.pb";

export const protobufPackage = "actor";

export interface Empty {
}

export interface ActorById {
  id: number;
}

export interface IActor {
  actorId: number;
  firstName: string;
  lastName: string;
  lastUpdate: Timestamp | undefined;
}

export const ACTOR_PACKAGE_NAME = "actor";

export interface ActorsServiceClient {
  getOne(request: ActorById): Observable<IActor>;

  getAll(request: Empty): Observable<IActor>;
}

export interface ActorsServiceController {
  getOne(request: ActorById): Promise<IActor> | Observable<IActor> | IActor;

  getAll(request: Empty): Observable<IActor>;
}

export function ActorsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOne", "getAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ActorsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ActorsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACTORS_SERVICE_NAME = "ActorsService";

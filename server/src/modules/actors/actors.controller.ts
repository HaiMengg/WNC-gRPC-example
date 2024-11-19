// import { Injectable } from "@nestjs/common";
// import { Observable } from "rxjs";
// import { InjectModel } from "@nestjs/sequelize";
// import { Actor, ActorById, ActorsServiceController } from "src/proto/actor.pb";
// import { ActorModel } from "src/models/actors.model";

// @Injectable()
// export class ActorsService implements ActorsServiceController {
//     constructor(
//         @InjectModel(ActorModel)
//         private actorsModel: typeof ActorModel
//     ) {}

//     async getOne(request: ActorById): Promise<Actor> | Observable<Actor> | Actor {
//         const actor = await this.actorsModel.findByPk(request.id);

//         return {
//             actorId: actor.id,
//             firstName: actor.first_name,
//             lastName: actor.last_name,
//             lastUpdate: actor.last_update
//         }
//     }
// }

import { Metadata, ServerDuplexStream } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod, GrpcStreamCall, GrpcStreamMethod } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/sequelize";
import { forkJoin, from, map, mergeMap, Observable, Subject, tap } from "rxjs";
import { Actor } from "src/models/actors.model";
import { IActor, ActorById } from "src/proto/actor.pb";

@Controller()
export class ActorsController {
    constructor(
        @InjectModel(Actor)
        private actorsModel: typeof Actor
    ) {}
    
    @GrpcMethod("ActorsService")
    async getOne(data: ActorById): Promise<Actor> {
        const actor = await this.actorsModel.findByPk(data.id);

        return actor;
    }

    // @GrpcMethod("ActorsService")
    // async getAll(): Promise<IActor[]> {
    //     const actors = await this.actorsModel.findAll();

    //     return 
    // }

    @GrpcMethod("ActorsService")
    getAll(): Observable<Actor> {
        const actor$ = new Subject<Actor>();
        const actors = from(this.actorsModel.findAll<Actor>());
    
        actors.subscribe({
            next: (actors: Actor[]) => {
                // Emit each actor using next()
                actors.forEach(actor => {
                    actor$.next(actor);
                });
            },
            complete: () => {
                // Complete the stream once all actors are emitted
                actor$.complete();
            },
            error: (err) => {
                // If there is an error during the database call, emit the error
                actor$.error(err);
            }
        });

        return actor$.asObservable();
    }
}
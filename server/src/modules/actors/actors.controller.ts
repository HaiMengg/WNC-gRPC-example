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

import { Metadata } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod, GrpcStreamCall, GrpcStreamMethod } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/sequelize";
import { Observable, Subject } from "rxjs";
import { ActorModel } from "src/models/actors.model";
import { Actor, ActorById } from "src/proto/actor.pb";

@Controller()
export class ActorsController {
    constructor(
        @InjectModel(ActorModel)
        private actorsModel: typeof ActorModel
    ) {}
    
    @GrpcMethod("ActorsService")
    async getOne(data: ActorById, metadata: Metadata): Promise<Actor> {
        const actor = await this.actorsModel.findByPk(data.id);

        return {
            actorId: actor.id,
            firstName: actor.first_name,
            lastName: actor.last_name,
            lastUpdate: actor.last_update
        }
    }

    @GrpcStreamMethod("ActorsService")
    async getMany(data$: Observable<ActorById>): Promise<Observable<Actor>> {
        const actors = await this.actorsModel.findAll<ActorModel>();
        
        const hero$ = new Subject<Actor>();

        const onNext = (actorById: ActorById) => {
            const actor = actors.find(({ id }) => id === actorById.id);
            console.log(actor);
            const item = {
                actorId: actor.id,
                firstName: actor.first_name,
                lastName: actor.last_name,
                lastUpdate: actor.last_update
            }
            hero$.next(item);
        }
        const onComplete = () => hero$.complete();
        data$.subscribe({
            next: onNext,
            complete: onComplete
        })

        return hero$.asObservable();
    }
}
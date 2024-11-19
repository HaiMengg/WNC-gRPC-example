import { Controller, Get, Inject, OnModuleInit, Param } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { timeStamp } from "console";
import { Observable, ReplaySubject, timestamp, toArray } from "rxjs";
import { Actor } from "src/models/actors.model";
import { ActorById, ACTORS_SERVICE_NAME, IActor } from "src/proto/actor.pb";
import { Timestamp } from 'google/protobuf/timestamp.pb';

interface ActorsService {
    getOne(data: ActorById): Observable<Actor>;
    getAll(): Observable<Actor>;
}

@Controller("actors")
export class ActorsController implements OnModuleInit {
    constructor(@Inject('ACTORS_PACKAGE') private readonly client: ClientGrpc) {}
    private actorsService: ActorsService;
    
    onModuleInit() {
        this.actorsService = this.client.getService<ActorsService>(ACTORS_SERVICE_NAME);
    }

    @Get(":id")
    getOne(@Param('id') id: number): Observable<Actor> {
        const actor = this.actorsService.getOne({ id: id })
        return actor;
    }

    @Get()
    getAll(): Observable<Actor[]> {
        const stream = this.actorsService.getAll();
        stream.subscribe({
            next: (actor) => {
                console.log("Received actor:", actor);
            },
            complete: () => {
                console.log("Stream complete");
            },
            error: (err) => {
                console.error("Stream error:", err);
            },
        });
        return stream.pipe(toArray());
    }
}
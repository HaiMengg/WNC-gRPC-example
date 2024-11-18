import { Controller, Get, Inject, Injectable, OnModuleInit, Param } from "@nestjs/common";
import { Client, ClientGrpc } from "@nestjs/microservices";
import { Observable, ReplaySubject, toArray } from "rxjs";
import { Actor, ActorById, ACTORS_SERVICE_NAME, ActorsServiceClient } from "src/proto/actor.pb";
import { grpcClientOptions } from "src/utils/grpc-client.options";

interface ActorsService {
    getOne(data: ActorById): Observable<Actor>;
    getMany(upstream: Observable<ActorById>): Observable<Actor>;
}

@Controller("actors")
export class ActorsController implements OnModuleInit {
    constructor(@Inject('ACTORS_PACKAGE') private readonly client: ClientGrpc) {}
    private actorsService: ActorsService;
    
    onModuleInit() {
        this.actorsService = this.client.getService<ActorsService>(ACTORS_SERVICE_NAME);
    }

    @Get()
    getMany(): Observable<Actor[]> {
        const ids$ = new ReplaySubject<ActorById>();
        ids$.next({ id: 1 })
        ids$.next({ id: 2 })
        ids$.next({ id: 3 })
        ids$.next({ id: 4 })
        ids$.complete();

        const stream = this.actorsService.getMany(ids$.asObservable());
        return stream.pipe(toArray());
    }

    @Get("/:id")
    getOne(@Param('id') id: number): Observable<Actor> {
        return this.actorsService.getOne({ id: id })
    }
}
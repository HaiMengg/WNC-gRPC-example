import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ActorModel } from "src/models/actors.model";

@Module({
    imports: [
        ConfigModule.forRoot({}),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'password',
            database: process.env.DB_NAME || 'nest',
            models: [ActorModel],
        }),
    ]
})
export class DatabaseModule {}
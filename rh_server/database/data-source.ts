import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",
            host: configService.get<string>("DB_HOST"),
            port: configService.get<number>("DB_PORT"),
            username: configService.get<string>("DB_USER"),
            database: configService.get<string>("DB_NAME"),
            password: configService.get<string>("DB_PASSWORD"),
            synchronize: true,
            entities: ['dist/**/*.entity{.js,.ts}'],
            migrations: ['dist/db/migrations/*{.js,.ts}'],
        };
    },
};

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: ['dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
};
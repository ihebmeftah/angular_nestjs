import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admindb',
      password: 'admindb',
      database: 'rh_managment',
      // entities: ['dist/**/*.entity{.js,.ts}'],
      // migrations: ['dist/db/migrations/*{.js,.ts}'],
      synchronize: false,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

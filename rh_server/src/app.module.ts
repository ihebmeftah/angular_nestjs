import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from 'database/data-source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TimetablesModule } from './timetables/timetables.module';
import { CongesModule } from './conges/conges.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath: ['.development.env']
    }),
    UserModule,
    AuthModule,
    AdminModule,
    TimetablesModule,
    CongesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

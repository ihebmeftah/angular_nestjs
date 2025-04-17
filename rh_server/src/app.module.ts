import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from 'database/data-source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TimetablesModule } from './timetables/timetables.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath: ['.development.env']
    }),
    UserModule,
    AuthModule,
    AdminModule,
    TimetablesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

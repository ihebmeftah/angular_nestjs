import { Module } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Timetable
    ],
    ),
    UserModule
  ],
  controllers: [TimetablesController],
  providers: [TimetablesService],
})
export class TimetablesModule { }

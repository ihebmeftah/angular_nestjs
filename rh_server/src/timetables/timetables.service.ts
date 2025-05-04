import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/enums/user_roles.enum';

@Injectable()
export class TimetablesService {
  constructor(
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
    private readonly userService: UserService,
  ) { }
  async create(createTimetableDto: CreateTimetableDto, userId: UUID) {
    const user = await this.userService.findOne(userId);
    const start = new Date(createTimetableDto.start);
    const end = new Date(createTimetableDto.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid start or end date');
    }
    const startTime = start.toISOString().split('T')[1].slice(0, 5);
    const endTime = end.toISOString().split('T')[1].slice(0, 5);
    const created = this.timetableRepository.create({
      startDate: start,
      endDate: end,
      startTime,
      endTime,
      validated: false,
      userId: userId,
      user,
    });
    return await this.timetableRepository.save(created);
  }

  async findAll(userId?: UUID) {
    // if the useer is an employer, return only their timetables
    // else (is Rh) return all timetables of employers for validation
    if (userId) {
      const user = await this.userService.findOne(userId);
      if (user.role == UserRole.EMPLOYER) {
        return this.timetableRepository.find({
          where: {
            userId,
          }
        });
      }
    }
    return await this.timetableRepository.find();
  }
  async findOne(id: UUID) {
    const timetable = await this.timetableRepository.findOneBy({ id });
    if (!timetable) {
      throw new NotFoundException('Timetable not found');
    }
    return timetable;
  }
  async validate(userid: UUID, timetableId: UUID) {
    const user = await this.userService.findOne(userid);
    const timetable = await this.findOne(timetableId);
    const updated = await this.timetableRepository.update(timetableId, { validated: true });
    timetable.validated = true;
    return timetable;

  }
}

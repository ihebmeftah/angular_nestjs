import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { UUID } from 'crypto';
import { UserRole } from '../enums/user_roles.enum';
import { Interval } from '@nestjs/schedule';
import { buildPaginatedResponse, getPaginationParams } from 'src/utils/pagination.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>) { }
  async createRh(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.userRepo.existsBy({ email: createUserDto.email })
    if (exist) {
      throw new ConflictException(`User with this ${createUserDto.email} already exists`);
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    const newUser = await this.userRepo.create({ ...createUserDto, role: UserRole.RH });
    return await this.userRepo.save(newUser);
  }

  async createEmployer(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.userRepo.existsBy({ email: createUserDto.email })
    if (exist) {
      throw new ConflictException(`User with this ${createUserDto.email} already exists`);
    }
    createUserDto.password = await hash(createUserDto.password, 10);
    const newUser = await this.userRepo.create({ ...createUserDto, role: UserRole.EMPLOYER });
    return await this.userRepo.save(newUser);
  }
  async findAll(role: UserRole, p?: number, l?: number) {
    const { skip, take, page, limit } = getPaginationParams(p, l);
 
    const [users, total] = await this.userRepo.findAndCount({
      where: {
        ...(role && { role })
      },
      skip,
      take
    });
    return buildPaginatedResponse(users, total, page, limit);
  }

  async findOne(id: UUID, role?: UserRole): Promise<User> {
    const user = await this.userRepo.findOneBy({
      id,
      ...(role && { role })
    });
    if (!user) {
      throw new NotFoundException(`User with this ${id} not found`);
    }
    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepo.update(id, updateUserDto);
    const updated = {
      ...user,
      ...updateUserDto
    }
    return updated;
  }

  async decrementCongeNb(id: UUID): Promise<boolean> {
    const user = await this.findOne(id);
    await this.userRepo.update(id, { congeNb: user.congeNb - 1 });
    return true;
  }

  @Interval(300000)
  // @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) 
  //reset every month
  async resestCongeNb(id: UUID) {
    const result = await this.userRepo.createQueryBuilder()
      .update(User)
      .set({ congeNb: 8 })
      .where('congeNb != :value', { value: 8 })
      .execute();
    console.log(`Reset conge number to 8 ${result.affected} `);
  }

  async removeRh(id: UUID): Promise<User> {
    const user = await this.findOne(id, UserRole.RH);
    return await this.userRepo.remove(user);
  }

  async removeEmployer(id: UUID): Promise<User> {
    const user = await this.findOne(id, UserRole.EMPLOYER);
    return await this.userRepo.remove(user);
  }


  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

}

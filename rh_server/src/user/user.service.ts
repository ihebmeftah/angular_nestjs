import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto) {
    const exist = await this.userRepo.existsBy({ email: createUserDto.email });
    if (exist) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    return this.userRepo.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const before = await this.findOne(id);
    await this.userRepo.update(id, updateUserDto);
    const after = await this.findOne(id);
    return { before, after };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

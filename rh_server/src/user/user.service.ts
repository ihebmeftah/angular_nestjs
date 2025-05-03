import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { UUID } from 'crypto';
import { UserRole } from '../enums/user_roles.enum';

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
  async findAll(role: UserRole): Promise<User[]> {
    if (role) {
      return await this.userRepo.findBy({ role });
    }
    return await this.userRepo.find();
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
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

  async remove(id: UUID): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepo.remove(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

}

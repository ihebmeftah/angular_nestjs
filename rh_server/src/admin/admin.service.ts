import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UUID } from 'crypto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>) { }
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const exist = await this.adminRepo.existsBy({ email: createAdminDto.email })
    if (exist) {
      throw new ConflictException(`User with this ${createAdminDto.email} already exists`);
    }
    createAdminDto.password = await hash(createAdminDto.password, 10);
    const newUser = await this.adminRepo.create(createAdminDto);
    return await this.adminRepo.save(newUser);
  }


  async findAll(): Promise<Admin[]> {
    return await this.adminRepo.find();
  }

  async findOne(id: UUID): Promise<Admin> {
    const user = await this.adminRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Admin with this ${id} not found`);
    }
    return user;
  }

  async update(id: UUID, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const user = await this.findOne(id);
    await this.adminRepo.update(id, updateAdminDto);
    const updated = {
      ...user,
      ...updateAdminDto
    }
    return updated;
  }

  async remove(id: UUID): Promise<Admin> {
    const user = await this.findOne(id);
    return await this.adminRepo.remove(user);
  }

  async findOneByEmail(email: string): Promise<Admin> {
    const user = await this.adminRepo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Admin with this ${email} not found`);
    }
    return user;
  }
}

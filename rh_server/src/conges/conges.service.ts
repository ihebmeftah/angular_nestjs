import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';
import { Conge } from './entities/conge.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UUID } from 'crypto';

@Injectable()
export class CongesService {
    constructor(
        @InjectRepository(Conge)
        private readonly congeRepo: Repository<Conge>,
        private readonly userService: UserService,
    ) { }

    async requestConge(createCongeDto: CreateCongeDto, userId: UUID) {
        const user = await this.userService.findOne(userId);
        if (user.congeNb <= 0) {
            throw new BadRequestException('You have no remaining leave days.');
        }
        createCongeDto.start = new Date(createCongeDto.start);
        createCongeDto.end = new Date(createCongeDto.end);
        const conge = this.congeRepo.create({
            ...createCongeDto,
            user,
            isAccepted: false,
        });
        this.userService.decrementCongeNb(userId);
        return await this.congeRepo.save(conge);
    }

    async findAll() {
        return await this.congeRepo.find({
            loadRelationIds: true,
        });
    }
}

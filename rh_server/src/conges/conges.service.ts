import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCongeDto } from './dto/create-conge.dto';
import { Conge } from './entities/conge.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UUID } from 'crypto';
import { buildPaginatedResponse, getPaginationParams } from 'src/utils/pagination.utils';
import { CongeType } from 'src/enums/conge_type.enum';

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
        });
        this.userService.decrementCongeNb(userId);
        return await this.congeRepo.save(conge);
    }

    async findAll(type?: CongeType, p?: number, l?: number) {
        const { skip, take, page, limit } = getPaginationParams(p, l);
        const [conges, total] = await this.congeRepo.findAndCount({
            where: {
                ...(type && { congeType: type }),
            },
            relations: {
                user: true,
            },
            order: {
                createdAt: 'DESC'
            },
            skip,
            take
        });
        return buildPaginatedResponse(conges, total, page, limit);
    }
    private async findOneById(id: UUID) {
        const conge = await this.congeRepo.findOne({ where: { id } });
        if (!conge) {
            throw new NotFoundException(`Conge with this id ${id} not found`)
        }
        return conge;
    }
    async acceptRequest(id: UUID) {
        const conge = await this.findOneById(id)
        await this.congeRepo.update(conge.id, { isAccepted: true });
        return { message: "Conge accepted successfully" }
    }

    async rejectedRequest(id: UUID) {
        const conge = await this.findOneById(id)
        await this.congeRepo.update(conge.id, { isAccepted: false });
        return { message: "Conge rejected successfully" }
    }
}

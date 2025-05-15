import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/enums/user_roles.enum';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evalRepo: Repository<Evaluation>,
    private readonly userService: UserService,
  ) { }
  async create(createEvaluationDto: CreateEvaluationDto) {
    const user = await this.userService.findOne(createEvaluationDto.userId, UserRole.EMPLOYER);
    const now = new Date();
    const day = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const existingEvaluation = await this.evalRepo.exists({
      where: {
        user: {
          id: createEvaluationDto.userId
        },
        day: day
      }
    });
    if (existingEvaluation) {
      throw new ConflictException(`Evaluation already exists for this user on ${day}`);

    }
    const evaluationCreated = this.evalRepo.create({
      day: day,
      rating: createEvaluationDto.rating,
      feedback: createEvaluationDto.feedback,
      user
    })
    return await this.evalRepo.save(evaluationCreated);
  }

  findAll(date?: Date) {
    return this.evalRepo.find();
  }

  findAllOfEmployer(userId: UUID) {
    return this.evalRepo.find({
      where: {
        user: {
          id: userId
        }
      }
    });
  }
  private async findOne(id: UUID) {
    const evaluation = await this.evalRepo.findOneBy({ id });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with this id ${id} not found`)
    }
    return evaluation;
  }

  async update(id: UUID, updateEvaluationDto: UpdateEvaluationDto) {
    await this.findOne(id)
    await this.evalRepo.update(id, updateEvaluationDto);
    return {
      message: `Evaluation with this id ${id} updated successfuly`
    };
  }

  async remove(id: UUID) {
    const evaluation = await this.findOne(id)
    await this.evalRepo.remove(evaluation)
    return {
      message: `Evaluation with this id ${id} deleted successfuly`
    };
  }
}

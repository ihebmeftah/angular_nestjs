import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class UpdateEvaluationDto extends PartialType(OmitType(CreateEvaluationDto, ['userId'] as const)) { }

import { PartialType } from '@nestjs/swagger';
import { CreateCongeDto } from './create-conge.dto';

export class UpdateCongeDto extends PartialType(CreateCongeDto) {}

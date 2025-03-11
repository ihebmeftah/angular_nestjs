import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// update all field except password
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)
) { }

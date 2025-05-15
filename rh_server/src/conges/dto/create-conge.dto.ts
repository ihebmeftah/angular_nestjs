import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CongeType } from "src/enums/conge_type.enum";

export class CreateCongeDto {
    @IsNotEmpty()
    @IsEnum(CongeType)
    congeType: CongeType;

    @IsDateString()
    @IsNotEmpty()
    // '2023-10-01T00:00:00.000Z'
    start: Date;

    @IsDateString()
    @IsNotEmpty()
    end: Date;

    @IsNotEmpty()
    @IsString()
    reason: string;
}

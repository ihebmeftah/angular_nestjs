import { IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { UUID } from "crypto";

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsUUID()
    userId: UUID

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    feedback: string

    @Min(1)
    @Max(5)
    rating: number
}

import { IsDateString, IsNotEmpty } from "class-validator";
export class CreateTimetableDto {
    @IsDateString()
    @IsNotEmpty()
    // '2023-10-01T00:00:00.000Z'
    start: Date;

    @IsDateString()
    @IsNotEmpty()
    end: Date;
}


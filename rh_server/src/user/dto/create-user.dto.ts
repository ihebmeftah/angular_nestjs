import { Role } from "../entities/role.enum";
import { IsEmail, IsString, IsEnum, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEnum(Role)
    role: Role;

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsOptional()
    @IsString()
    photo: string;
}

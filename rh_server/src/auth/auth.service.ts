import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { UserBaseEntity } from 'database/user.base';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { UserRole } from 'src/enums/user_roles.enum';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ) { }
    async login(loginDto: LoginDto): Promise<{ token: string, user: Admin | User }> {
        let loggedUser: Admin | User | null;
        loggedUser = await this.adminService.findOneByEmail(loginDto.email);
        loggedUser ??= await this.userService.findOneByEmail(loginDto.email);
        if (!loggedUser) {
            throw new NotFoundException("User not found");
        }
        const isMatch = await compare(loginDto.password, loggedUser.password);
        const payload = {
            id: loggedUser.id,
            fullname: loggedUser.firstName + " " + loggedUser.lastName,
            email: loggedUser.email,
            role: loggedUser instanceof User ? loggedUser.role : UserRole.ADMIN
        };
        if (isMatch) {
            return {
                token: this.jwtService.sign(payload),
                user: loggedUser,
            };
        }
        throw new BadRequestException("Password incorrect");;
    }

    async register(createAdminDto: CreateAdminDto): Promise<Admin> {
        return await this.adminService.create(createAdminDto);
    }

}

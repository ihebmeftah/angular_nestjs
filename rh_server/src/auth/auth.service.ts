import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { AdminService } from 'src/admin/admin.service';
import { UserRole } from 'src/enums/user_roles.enum';
import { UserBaseEntity } from 'database/user.base';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ) { }
    async login(loginDto: LoginDto): Promise<{ token: string, user: UserBaseEntity }> {
        let loggedUser: UserBaseEntity | null;
        let role: UserRole;
        loggedUser = await this.adminService.findOneByEmail(loginDto.email);
        loggedUser ??= await this.userService.findOneByEmail(loginDto.email);
        if (loggedUser) {
            role = loggedUser.role;
        } else {
            throw new NotFoundException(`User with this ${loginDto.email} not found`);
        }
        const isMatch = await compare(loginDto.password, loggedUser.password);
        if (isMatch) {
            return {
                token: this.jwtService.sign({ id: loggedUser.id, email: loggedUser.email, role: loggedUser.role }),
                user: loggedUser,
            };
        }
        throw new BadRequestException("Password incorrect");;
    }

}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, ParseEnumPipe, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { UserRole } from '../enums/user_roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Pagination } from 'src/decorators/pagination.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/employer")
  @Roles(UserRole.RH)
  createEmployer(@Body() createUserDto: CreateUserDto) {
    return this.userService.createEmployer(createUserDto);
  }

  @Post("/rh")
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createRh(createUserDto);
  }

  @Get()
  @Roles(UserRole.RH, UserRole.ADMIN)
  findAll(
    @Query('role', new ParseEnumPipe(UserRole, {
      optional: true,
      exceptionFactory: (error) => new BadRequestException(`role query must be ${UserRole}`)
    }))
    role: UserRole,
    @Pagination() pagination: {
      page?: number;
      limit?: number;
    },
    @Req() req: any,
  ) {
    if (req.user.role === UserRole.RH) {
      return this.userService.findAll(UserRole.EMPLOYER, pagination.page, pagination.limit);
    }
    return this.userService.findAll(role, pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('rh/:id')
  @Roles(UserRole.ADMIN)

  removeRh(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.removeRh(id);
  }

  @Delete('employer/:id')
  @Roles(UserRole.RH)
  removeEmployer(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.removeEmployer(id);
  }
}
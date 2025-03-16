import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, ParseEnumPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { UserRole } from '../enums/user_roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/employer")
  createEmployer(@Body() createUserDto: CreateUserDto) {
    return this.userService.createEmployer(createUserDto);
  }

  @Post("/rh")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createRh(createUserDto);
  }

  @Get()
  findAll(
    @Query('role', new ParseEnumPipe(UserRole, {
      optional: true,
      exceptionFactory: (error) => new BadRequestException(`role query must be ${UserRole}`)
    }))
    role: UserRole
  ) {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';
import { CongesService } from './conges.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/user_roles.enum';
import { CreateCongeDto } from './dto/create-conge.dto';
import { Pagination } from 'src/decorators/pagination.decorator';
import { CongeType } from 'src/enums/conge_type.enum';
import { UUID } from 'crypto';

@Controller('conges')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CongesController {
  constructor(private readonly congesService: CongesService) { }

  @Post('/request')
  @Roles(UserRole.EMPLOYER)
  async requestConge(
    @Body() createCongeDto: CreateCongeDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.congesService.requestConge(createCongeDto, userId);
  }

  @Get()
  async getAllConges(
    @Query('type', new ParseEnumPipe(CongeType, { optional: true }),) type: CongeType,
    @Pagination() pagination: {
      page?: number;
      limit?: number;
    }) {
    return this.congesService.findAll(type, pagination.page, pagination.limit);
  }

  @Patch(':id/accepted')
  @Roles(UserRole.RH)
  async acceptRequest(
    @Param('id', ParseUUIDPipe) id: UUID
  ) {
    return this.congesService.acceptRequest(id);
  }

  @Patch(':id/rejected')
  @Roles(UserRole.RH)
  async rejectRequest(
    @Param('id', ParseUUIDPipe) id: UUID
  ) {
    return this.congesService.rejectedRequest(id);
  }
}

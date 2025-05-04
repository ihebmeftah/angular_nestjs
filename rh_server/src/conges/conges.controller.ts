import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CongesService } from './conges.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/user_roles.enum';
import { CreateCongeDto } from './dto/create-conge.dto';

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
  async getAllConges() {
    return this.congesService.findAll();
  }

}

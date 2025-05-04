import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req, ParseUUIDPipe } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/user_roles.enum';
import { UUID } from 'crypto';

@Controller('timetables')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimetablesController {
  constructor(private readonly timetablesService: TimetablesService) { }

  @Post()
  @Roles(UserRole.EMPLOYER)
  create(
    @Body() createTimetableDto: CreateTimetableDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.timetablesService.create(createTimetableDto, userId);
  }

  @Get()
  findAll(
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.timetablesService.findAll(userId);
  }
  @Patch(':id/validate')
  validate(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.timetablesService.validate(userId, id);
  }
}
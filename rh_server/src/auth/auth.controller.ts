import { Body, Get, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/auth.guard';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Post('register')
  async register(@Body() createAdminDto: CreateAdminDto) {
    return await this.authService.register(createAdminDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async verify(@Request() req) {
    /// { userId, email , role}
    return req.user;
  }
}

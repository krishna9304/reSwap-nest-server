import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dto/auth.swagger.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login to an existing account',
    operationId: 'login',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
    description: 'User logged in succesfullly',
  })
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }

  @Get('logout')
  @ApiOperation({
    summary: 'Logout of the current account',
    operationId: 'logout',
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({
    status: 200,
    description: 'Cookie cleared. User logged out.',
  })
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    response.send(null);
  }

  @Get('self')
  @ApiOperation({
    summary: 'Get the current user',
    operationId: 'self',
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Logged in user details fetched succesfullly',
  })
  @UseGuards(JwtAuthGuard)
  async getSelf(@CurrentUser() user: User) {
    return user;
  }
}

import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user.dto';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from 'src/auth/dto/auth.swagger.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new host account',
    operationId: 'register',
  })
  @ApiBody({ type: CreateUserRequest })
  @ApiResponse({
    status: 201,
    type: LoginResponseDto,
    description: 'User registered succesfullly',
  })
  async createUser(
    @Body() request: CreateUserRequest,
    @Res() response: Response,
  ): Promise<void> {
    const user = await this.userService.createUser(request);
    return await this.authService.login(user, response);
  }
}

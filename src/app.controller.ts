import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerHealth(): any {
    return this.appService.getServerHealth();
  }
}

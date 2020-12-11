import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Display } from './display';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): Display[] {
    return this.appService.getList();
  }
}

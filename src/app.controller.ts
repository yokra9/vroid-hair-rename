import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Presets } from './presets';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): Presets {
    return this.appService.getList();
  }
}

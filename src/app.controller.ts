import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Presets } from './presets';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): Presets {
    try {
      return this.appService.getList();
    } catch (err) {
      console.log(err)
      throw new HttpException(`プリセットが取得できませんでした。${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

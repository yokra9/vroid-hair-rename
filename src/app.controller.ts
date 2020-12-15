import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body
} from '@nestjs/common';
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
      console.log(err);
      throw new HttpException(
        `プリセットが取得できませんでした。${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  postList(@Body() edited: Presets) {
    try {
      this.appService.postList(edited);
    } catch (err) {
      throw new HttpException(
        `プリセットが更新できませんでした。${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Display } from './display';
import { Preset, Color } from './preset';

interface Item {
  // ディレクトリ名
  path: string;
  // プリセット
  preset: Preset;
}

@Injectable()
export class AppService {
  getList(): Display[] {
    const fs = require('fs');

    // プリセットの一覧を取得
    const presets: Display[] = fs
      .readdirSync('./tmp/p')
      // 各プリセットのJSONを読み込む
      .map(
        (path: string): Item => {
          return {
            path,
            preset: require(`../tmp/p/${path}/preset.json`) as Preset,
          };
        },
      )
      // JSONから一覧表示に必要な情報を抜き出す
      .map(
        (item: Item): Display => {
          return {
            path: item.path,
            name: item.preset._DisplayName,
            color: item.preset._MaterialSet._Materials[0]._Color,
          };
        },
      );

    return presets;
  }
}

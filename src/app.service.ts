import { Injectable } from '@nestjs/common';
import { Presets, FilteredPreset } from './presets';
import { Preset } from './preset';
const path = require('path');

interface Item {
  // ディレクトリ名
  name: string;
  // プリセット
  preset: Preset;
}

@Injectable()
export class AppService {
  getList(): Presets {
    const fs = require('fs');

    const presetDir = path.resolve(__dirname, '../tmp/p');

    // プリセットの一覧を取得
    const presets: FilteredPreset[] = fs
      .readdirSync(presetDir)
      // 各プリセットのJSONを読み込む
      .map(
        (name: string): Item => {
          return {
            name,
            preset: JSON.parse(
              fs.readFileSync(path.join(presetDir, name, 'preset.json')),
            ) as Preset,
          };
        },
      )
      // JSONから一覧表示に必要な情報を抜き出す
      .map(
        (item: Item): FilteredPreset => {
          return {
            name: item.name,
            displayName: item.preset._DisplayName,
            color: item.preset._MaterialSet._Materials[0]._Color,
            texture: item.preset._MaterialSet._Materials[0]._MainTextureId,
          };
        },
      );

    return { presets };
  }
}

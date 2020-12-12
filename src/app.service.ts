import { Injectable } from '@nestjs/common';
import { Presets, FilteredPreset } from './presets';
import { Preset } from './preset';
const path = require('path');
const fs = require('fs');

interface Item {
  // ディレクトリ名
  name: string;
  // プリセット
  preset: Preset;
}

@Injectable()
export class AppService {
  getList(): Presets {
    const presetDir = path.resolve(__dirname, '../tmp/p');

    // ディレクトリ名からプリセットを取得
    const getPreset = (name: string): Preset => {
      try {
        return JSON.parse(
          fs.readFileSync(path.join(presetDir, name, 'preset.json')),
        ) as Preset;
      } catch (err) {
        throw new Error(`プリセットが見つかりません ${name} ${err}`);
      }
    };

    // ディレクトリ名とマテリアル ID から base64 化した画像を取得
    const getTexture = (name: string, id: string): string => {
      try {
        return fs
          .readFileSync(
            path.join(
              presetDir,
              name,
              'materials',
              'rendered_textures',
              `${id}.png`,
            ),
          )
          .toString('base64') as string;
      } catch (err) {
        throw new Error(`テクスチャ画像が見つかりません ${name} ${id} ${err}`);
      }
    };

    // プリセットの一覧を取得
    const presets: FilteredPreset[] = fs
      .readdirSync(presetDir)
      // 各プリセットのJSONを読み込む
      .map(
        (name: string): Item => {
          return {
            name,
            preset: getPreset(name),
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
            texture: getTexture(
              item.name,
              item.preset._MaterialSet._Materials[0]._MainTextureId,
            ),
          };
        },
      );

    return { presets };
  }
}

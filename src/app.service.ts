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

const presetDir = path.resolve(__dirname, '../tmp/p');

@Injectable()
export class AppService {
  // ディレクトリ名からプリセットを取得
  readPreset(name: string): Preset {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(presetDir, name, 'preset.json')),
      ) as Preset;
    } catch (err) {
      throw new Error(`プリセットが見つかりません ${name} ${err}`);
    }
  }

  // ディレクトリ名のプリセットを更新
  writePreset(name: string, preset: Preset) {
    try {
      fs.writeFileSync(
        path.join(presetDir, name, 'preset.json'),
        JSON.stringify(preset),
      );
    } catch (err) {
      throw new Error(`プリセットに書き込めません ${name} ${err}`);
    }
  }

  // ディレクトリ名とマテリアル ID から base64 化した画像を取得
  getTexture(name: string, id: string): string {
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
  }

  // プリセットの一覧を取得
  getList(): Presets {
    const presets: FilteredPreset[] = fs
      .readdirSync(presetDir)
      // 各プリセットのJSONを読み込む
      .map(
        (name: string): Item => {
          return {
            name,
            preset: this.readPreset(name),
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
            shadeColor: item.preset._MaterialSet._Materials[0]._ShadeColor,
            highlightColor:
              item.preset._MaterialSet._Materials[0]._HighlightColor,
            outlineColor: item.preset._MaterialSet._Materials[0]._OutlineColor,
            texture: this.getTexture(
              item.name,
              item.preset._MaterialSet._Materials[0]._MainTextureId,
            ),
          };
        },
      );

    return { presets };
  }

  // プリセットを更新
  postList(edited: Presets) {
    edited.presets
      // 渡された情報をもとにアイテムリストを作成
      .map(
        (filterd): Item => {
          const preset = this.readPreset(filterd.name);
          preset._DisplayName = filterd.displayName;
          return { name: filterd.name, preset };
        },
      )
      // それぞれのアイテムをJSONに書き出し
      .map((item) => this.writePreset(item.name, item.preset));
  }
}

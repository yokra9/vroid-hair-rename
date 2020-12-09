import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getList(): string {
    const fs = require('fs');

    // プリセットの一覧を取得
    const presets = fs
      .readdirSync('./tmp/p')
      // 各プリセットのJSONを読み込む
      .map((path) => [path, require(`../tmp/p/${path}/preset.json`)])
      // JSONから一覧表示に必要な情報を抜き出す
      .map(([path, json]) => [
        // ディレクトリ名
        path,
        // 表示名
        json._DisplayName,
        // テクスチャID
        json._MaterialSet._Materials[0]._MainTextureId,
        // テクスチャ色
        json._MaterialSet._Materials[0]._Color,
      ]);

    return presets;
  }
}

const fs = require("fs");

// プリセットの一覧を取得
const presets = fs
  .readdirSync("./tmp")
  // 各プリセットのJSONを読み込む
  .map((path) => [path, require(`./tmp/${path}/preset.json`)])
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

presets.map(([path, name, texture, color]) =>
  console.log(path, name, texture, color)
);

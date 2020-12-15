import { Color } from './preset';

// 一覧取得 API で返却する用の型
export interface Presets {
  presets: FilteredPreset[];
}

// 画面でプリセットを表現するのに必要な情報
export interface FilteredPreset {
  // ディレクトリ名
  name: string;
  // 表示名
  displayName: string;
  // テクスチャ（base64）
  texture: string;
  // 色（RGB）
  color: Color;
  shadeColor: Color;
  outlineColor: Color;
  highlightColor: Color;
}

import { Material } from './preset';

// 一覧取得 API で返却する用の型
export interface Presets {
  presets: FilteredPreset[];
}

// テクスチャのbase64画像
export interface Base64texture {
  texture: string;
}

export type UnitedMaterial = Material | Base64texture;

// 画面でプリセットを表現するのに必要な情報
export interface FilteredPreset {
  // ディレクトリ名
  name: string;
  // 表示名
  displayName: string;
  // マテリアル
  materials: Array<UnitedMaterial>;
}

import { Color } from './preset';

// 一覧取得 API で返却する用の型
export interface Presets {
  presets: FilteredPreset[];
}

// 画面で必要十分な情報だけに絞った型
export interface FilteredPreset {
  name: string;
  displayName: string;
  texture: string;
  color: Color;
}


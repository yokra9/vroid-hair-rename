<template>
  <div>
    <!-- 上部ナビゲーション -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="./edit.html">
          VRoidのヘアマテリアル管理するやつ
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button is-primary" @click="postPreset()">
              <strong>更新</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- メッセージ -->
    <article class="message" :class="classesForMessage()">
      <div class="message-header">
        <p>メッセージ</p>
        <button
          class="delete"
          aria-label="delete"
          @click="closeMessage()"
        ></button>
      </div>
      <div class="message-body" v-text="message.sentence" />
    </article>

    <!-- メインコンテンツ -->
    <div class="columns">
      <!-- 左メニュー -->
      <aside class="column is-one-fifth menu">
        <div class="sticky ml-3">
          <p class="menu-label">テクスチャ</p>
          <ul class="menu-list">
            <li v-for="preset in presets" :key="preset.name">
              <a :href="`#${preset.name}`">{{ preset.name }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <!-- プリセット一覧 -->
      <div class="column is-four-fifths menu">
        <!-- プリセット -->
        <div
          v-for="preset in presets"
          :key="preset.name"
          class="preset box"
          :id="preset.name"
        >
          <!-- プリセット名の入力 -->
          <input
            type="text"
            v-model="preset.displayName"
            :placeholder="preset.name"
            class="input is-info column mr-2"
          />

          <!-- マテリアル一覧 -->
          <div class="material_slider mb-2">
            <span class="material_list">
              <!-- マテリアル -->
              <div
                v-for="material in preset.materials"
                :key="material.name"
                class="material"
              >
                <div class="box mr-4">
                  <img
                    :src="`data:image/png;base64,${material.texture}`"
                    class="texture"
                  />
                  <p :style="{ backgroundColor: rgb(material._Color) }">
                    基本色
                  </p>
                  <p :style="{ backgroundColor: rgb(material._ShadeColor) }">
                    影色
                  </p>
                  <p
                    :style="{ backgroundColor: rgb(material._HighlightColor) }"
                  >
                    ハイライト
                  </p>
                  <p :style="{ backgroundColor: rgb(material._OutlineColor) }">
                    アウトライン
                  </p>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { Presets, FilteredPreset } from '../src/presets';
import axios from 'axios';
import { Color, Preset } from 'src/preset';

export default {
  setup() {
    // プリセット情報
    const presets = ref<FilteredPreset[]>([]);

    // プリセットを取得する関数
    const getPreset = async () => {
      try {
        const res = await axios.get<Presets>('./');
        presets.value = res.data.presets;
      } catch (err) {
        console.error(err.response.data);
        openMessage({
          type: 'danger',
          sentence: `取得に失敗しました...\n${err.response.data.message}`,
        });
      }
    };

    // 初期化時に実行
    onMounted(() => getPreset());

    // プリセットを更新する関数
    const postPreset = async () => {
      const data: Presets = {
        presets: presets.value,
      };

      try {
        const res = await axios.post('./', data);
        openMessage({ type: 'success', sentence: '更新しました！' });
      } catch (err) {
        console.error(err.response.data);
        openMessage({
          type: 'danger',
          sentence: `更新に失敗しました...\n${err.response.data.message}`,
        });
      }
    };

    // Color 型から rgb(R,G,B)に変換する関数
    const rgb = (color: Color) => `rgb(${color.r}, ${color.g}, ${color.b})`;

    // メッセージ型
    interface Message {
      type: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
      sentence: string;
    }

    // メッセージ情報
    const message = ref<Message>({ type: 'primary', sentence: 'メッセージ' });

    // メッセージ表示フラグ
    const isShowMessage = ref<boolean>(false);

    // メッセージを閉じる関数
    const closeMessage = () => {
      isShowMessage.value = false;
    };

    // メッセージを設定して表示する関数
    const openMessage = (m: Message) => {
      isShowMessage.value = true;
      message.value = { type: m.type, sentence: m.sentence };
    };

    const classesForMessage = (): string[] => {
      const classes = [`is-${message.value.type}`];
      if (isShowMessage.value) classes.push('is-show');
      return classes;
    };

    return {
      presets,
      postPreset,
      rgb,
      message,
      isShowMessage,
      closeMessage,
      classesForMessage,
    };
  },
};
</script>

<style>
@import url('bulma/css/bulma.min.css');

.navbar {
  position: sticky;
  top: 0;
  height: 56px;
  background-color: #ffffff50;
}

.message {
  position: fixed;
  width: 50%;
  z-index: 1;
  top: 56px;
  right: 12px;
  transition-property: opacity;
  transition-duration: 0.5s;
  opacity: 0;
}

.is-show {
  opacity: 1;
}

.sticky {
  position: sticky;
  top: 56px;
}

.preset {
  margin-bottom: 20px;
}

.material_slider {
  overflow-x: scroll;
}

.material_list {
  display: inline-flex;
}

.material {
  width: 200px;
}

.texture {
  height: 150px;
}
</style>
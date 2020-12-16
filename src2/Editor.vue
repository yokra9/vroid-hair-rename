<template>
  <div class="columns">
    <aside class="column is-one-fifth menu">
      <div class="sticky">
        <p class="menu-label">テクスチャ</p>
        <ul class="menu-list">
          <li v-for="preset in presets" :key="preset.name">
            <a :href="`#${preset.name}`">{{ preset.name }}</a>
          </li>
        </ul>
      </div>
    </aside>

    <div class="column is-four-fifths menu">
      <div
        v-for="preset in presets"
        :key="preset.name"
        class="preset box"
        :id="preset.name"
      >
        <input
          type="text"
          v-model="preset.displayName"
          @change="postPreset()"
          :placeholder="preset.name"
          class="input is-info column mr-2"
        />
        <div class="material_slider mb-2">
          <span class="material_list">
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
                <p :style="{ backgroundColor: rgb(material._Color) }">基本色</p>
                <p :style="{ backgroundColor: rgb(material._ShadeColor) }">
                  影色
                </p>
                <p :style="{ backgroundColor: rgb(material._HighlightColor) }">
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
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { Presets, FilteredPreset } from '../src/presets';
import axios from 'axios';
import { Color, Preset } from 'src/preset';

export default {
  setup() {
    const presets = ref<FilteredPreset[]>([]);

    // プリセットを取得
    const getPreset = async () => {
      try {
        const res = await axios.get<Presets>('./');
        presets.value = res.data.presets;
      } catch (err) {
        console.error(err.response.data);
      }
    };

    // プリセットを更新
    const postPreset = async () => {
      const data: Presets = {
        presets: presets.value,
      };

      try {
        const res = await axios.post('./', data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    const rgb = (color: Color) => `rgb(${color.r}, ${color.g}, ${color.b})`;

    onMounted(() => getPreset());

    return {
      presets,
      postPreset,
      rgb,
    };
  },
};
</script>

<style>
@import url('bulma/css/bulma.min.css');

.sticky {
  position: sticky;
  top: 0;
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
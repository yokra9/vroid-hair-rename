<template>
  <div>
    <fieldset v-for="preset in presets" :key="preset.name">
      <legend>{{ preset.name }}</legend>
      <input type="text" v-model="preset.displayName" />
      <div v-for="material in preset.materials" :key="material.name">
        <img :src="`data:image/png;base64,${material.texture}`" class="texture" />
        <p :style="{ backgroundColor: rgb(material._Color) }">基本色</p>
        <p :style="{ backgroundColor: rgb(material._ShadeColor) }">影色</p>
        <p :style="{ backgroundColor: rgb(material._HighlightColor) }">
          ハイライト
        </p>
        <p :style="{ backgroundColor: rgb(material._OutlineColor) }">
          アウトライン
        </p>
      </div>
    </fieldset>
    <input type="button" @click="postPreset()" value="更新" />
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

<style scoped>
.texture {
  height: 150px;
}
</style>
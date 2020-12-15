<template>
  <div>
    <fieldset v-for="preset in presets" :key="preset.name">
      <legend>{{ preset.name }}</legend>
      <input type="text" v-model="preset.displayName" />
      <img :src="`data:image/png;base64,${preset.texture}`" class="texture" />
      <p :style="{ backgroundColor: rgb(preset.color) }">基本色</p>
      <p :style="{ backgroundColor: rgb(preset.shadeColor) }">影色</p>
      <p :style="{ backgroundColor: rgb(preset.highlightColor) }">ハイライト</p>
      <p :style="{ backgroundColor: rgb(preset.outlineColor) }">アウトライン</p>
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
  float: left;
}
</style>
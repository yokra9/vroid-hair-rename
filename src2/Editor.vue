<template>
  <div>
    <fieldset v-for="preset in presets" :key="preset.name">
      <legend>{{ preset.name }}</legend>
      <input type="text" v-model="preset.displayName" />
      <img :src="`data:image/png;base64,${preset.texture}`" />
      <p>{{ preset.color }}</p>
    </fieldset>
    <input type="button" @click="postPreset()" value="更新" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { Presets, FilteredPreset } from '../src/presets';
import axios from 'axios';

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

    onMounted(() => getPreset());

    return {
      presets,
      postPreset,
    };
  },
};
</script>
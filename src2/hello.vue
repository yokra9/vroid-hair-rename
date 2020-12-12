<template>
  <div>
    <fieldset v-for="preset in presets" :key="preset.name">
      <legend>{{ preset.name }}</legend>
      <input type="text" v-model="preset.displayName" />
      <img :src="`data:image/png;base64,${preset.texture}`" />
      <p>{{ preset.color }}</p>
    </fieldset>
    <input type="button" @click="test()" value="テストボタン" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { Presets, FilteredPreset } from '../src/presets';
import axios from 'axios';

export default {
  setup() {
    const presets = ref<FilteredPreset[]>([]);

    const test = () => {
      console.log(
        presets.value.map((p) => {
          console.log(p.displayName);
        }),
      );
    };

    onMounted(async () => {
      try {
        const res = await axios.get('./');
        presets.value = res.data.presets as FilteredPreset[];
      } catch (err) {
        console.error(err.response.data);
      }
    });

    return {
      presets,
      test,
    };
  },
};
</script>
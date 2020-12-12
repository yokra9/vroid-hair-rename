<template>
  <div>
    <fieldset v-for="preset in presets" :key="preset.name">
      <legend>{{ preset.name }}</legend>
      <input type="text" v-model="preset.displayName" />
      <p>{{ preset.texture }}</p>
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
      const res = await axios.get('./');
      presets.value = res.data.presets as FilteredPreset[];
    });

    return {
      presets,
      test,
    };
  },
};
</script>
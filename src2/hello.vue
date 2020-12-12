<template>
  <div>
    <pre>{{ presets }}</pre>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { Presets, FilteredPreset } from '../src/presets';
import axios from 'axios';

export default {
  setup() {
    const presets = ref<Presets>({ presets: [] });

    onMounted(async () => {
      const res = await axios.get('./');
      presets.value = res.data as Presets;
    });

    return {
      presets,
    };
  },
};
</script>
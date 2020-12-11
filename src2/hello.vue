<template>
  <div>
    <h1>{{ countValue }} {{ year }}</h1>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {

    const countValue = ref(0);

    const increment = () => {
      countValue.value += 1;
    };

    const decrement = () => {
      countValue.value -= 1;
    };

    return {
      countValue,
      increment,
      decrement,
    };
  },
};
</script>
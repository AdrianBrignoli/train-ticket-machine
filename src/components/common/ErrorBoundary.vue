<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const error = ref<Error | null>(null);

onErrorCaptured((err: Error) => {
  error.value = err;
  return false;
});
</script>

<template>
  <slot v-if="!error" />
  <slot 
    v-else 
    name="error" 
    :error="error"
  />
</template> 
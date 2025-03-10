<script setup lang="ts">
import { computed } from 'vue';
import { ApiError } from '@/services/api';

const props = defineProps<{
  error: Error;
  fullPage?: boolean;
  onRetry?: () => void;
}>();

const errorMessage = computed(() => {
  if (props.error instanceof ApiError) {
    switch (props.error.statusCode) {
      case 404: return 'Station data not found';
      case 429: return 'Too many requests, please try again later';
      case 500: return 'Server error, please try again later';
      default: return props.error.message;
    }
  }
  return props.error.message;
});
</script>

<template>
  <div class="error-display" :class="{ 'error-display--full': fullPage }">
    <h1 v-if="fullPage">Oops! Something went wrong</h1>
    <h2 v-else>Error</h2>
    <p>{{ errorMessage }}</p>
    <button v-if="onRetry" @click="onRetry">
      {{ fullPage ? 'Refresh Page' : 'Try Again' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.error-display {
  text-align: center;
  padding: 1rem;

  &--full {
    padding: 2rem;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style> 
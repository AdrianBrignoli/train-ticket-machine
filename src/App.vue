<script setup lang="ts">
import ErrorBoundary from '@/components/common/ErrorBoundary.vue';
import ErrorDisplay from '@/components/common/ErrorDisplay.vue';

const refreshPage = () => window.location.reload();
</script>

<template>
  <div class="app">
    <ErrorBoundary>
      <template #default>
        <router-view></router-view>
      </template>
      <template #error="{ error }">
        <ErrorDisplay 
          :error="error"
          :full-page="true"
          :on-retry="refreshPage"
        />
      </template>
    </ErrorBoundary>
  </div>
</template>

<style lang="scss">
.app {
  padding: 2rem;
}
</style>

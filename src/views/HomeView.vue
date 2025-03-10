<script setup lang="ts">
import StationSearch from '../components/station-search/StationSearch.vue';
import ErrorBoundary from '@/components/common/ErrorBoundary.vue';
import ErrorDisplay from '@/components/common/ErrorDisplay.vue';
import { useStationInitializer } from '@/components/station-search/composables/misc/useStationInitializer';
import { onMounted } from 'vue';

const { initialize } = useStationInitializer();

onMounted(initialize);
</script>

<template>
  <main class="home">
    <h1>Train Ticket Machine</h1>
    <ErrorBoundary>
      <template #default>
        <StationSearch />
      </template>
      <template #error="{ error }">
        <ErrorDisplay 
          :error="error"
          :on-retry="initialize"
          fullPage
        />
      </template>
    </ErrorBoundary>
  </main>
</template> 
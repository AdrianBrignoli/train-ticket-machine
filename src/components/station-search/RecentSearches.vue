<script setup lang="ts">
import type { Station } from '@/types/station';
import StationItem from '@/components/station-search/StationItem.vue';

defineProps<{
  searches: Station[];
  selectedStation: Station | null;
}>();

defineEmits<{
  (e: 'select-station', station: Station): void;
}>();
</script>

<template>
  <section class="station-search__list-container">
    <h2 class="station-search__list-title">Recent Searches</h2>
    <div class="station-search__stations-list">
      <StationItem
        v-for="station in searches"
        :key="station.stationCode"
        :station="station"
        :is-selected="selectedStation?.stationCode === station.stationCode"
        @select="$emit('select-station', station)"
      />
    </div>
  </section>
</template>


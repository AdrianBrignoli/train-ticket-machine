<script setup lang="ts">
import type { Station } from '@/types/station';

defineProps<{
  station: Station;
  isSelected: boolean;
}>();

defineEmits<{
  (e: 'select'): void;
}>();
</script>

<template>
  <button 
    class="station-item"
    :class="{ 'station-item--selected': isSelected }"
    @click="$emit('select')"
  >
    <div class="station-item__content">
      <span class="station-item__name">{{ station.stationName }}</span>
      <span class="station-item__code">{{ station.stationCode }}</span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.station-item {
  width: 100%;
  text-align: left;
  padding: 0.8rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    font-weight: normal;
  }

  &__code {
    color: #6c757d;
    font-size: 0.9em;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  &--selected {
    background-color: #007bff;
    color: white;

    .station-item__code {
      color: rgba(255, 255, 255, 0.8);
    }

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style> 
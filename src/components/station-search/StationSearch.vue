/**
 * Main station search interface component
 * 
 * @component
 * @example
 * <StationSearch />
 * 
 * @description
 * Provides a keyboard-based interface for searching train stations.
 * Features include:
 * - Predictive keyboard input
 * - Real-time station filtering
 * - Recent searches
 * - Error handling
 * 
 * @emits {Station} select-station - When a station is selected
 * @emits {void} checkout - When proceeding to checkout
 */
 
<script setup lang="ts">
import { useStationManager } from '@/components/station-search/composables/orchestrator/useStationManager';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import KeyboardGrid from './KeyboardGrid.vue';
import StationResults from './StationResults.vue';
import RecentSearches from './RecentSearches.vue';

const {
  searchTerm,
  searchResult,
  loading,  
  recentSearches,
  selectedStation,
  errorMessage,
  keyboardLayout,
  handleAppendLetter, 
  handleStationSelect,
  handleCheckoutClick,
  handleSpecialKey,
} = useStationManager();

</script>

<template>
  <div class="station-search" :key="searchTerm">
    <div class="station-search__container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Enter station name"
        aria-label="Search stations"
        :disabled="loading"
        class="station-search__input"
        readonly
      />
      
      <div v-if="loading" class="station-search__loading">
        <LoadingSpinner text="Loading stations..." />
      </div>

      <div v-else>
        <KeyboardGrid 
          :search-result="searchResult"
          :has-input="searchTerm.length > 0"
          :layout="keyboardLayout"
          @letter-click="handleAppendLetter"
          @special-key="handleSpecialKey"
          class="station-search__keyboard"
        />

        <StationResults
          v-if="searchTerm && searchResult?.stations && searchResult.stations.length > 0"
          :stations="searchResult.stations"
          :selected-station="selectedStation"
          @select-station="handleStationSelect"
        />

        <RecentSearches
          v-if="recentSearches && recentSearches.length > 0"
          :searches="recentSearches"
          :selected-station="selectedStation"
          @select-station="handleStationSelect"
        />

        <div v-if="errorMessage" class="station-search__error">
          {{ errorMessage }}
        </div>

        <section class="station-search__checkout-container">
          <button 
            class="station-search__checkout-button"
            @click="handleCheckoutClick"
          >
            Continue to Checkout
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './styles/StationSearch.scss';
@use './styles/shared.scss';
</style>

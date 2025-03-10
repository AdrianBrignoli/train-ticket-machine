import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Station } from '../types/station';
import type { KeyboardLayout } from '../types/keyboard';

/**
 * Central store for station management
 * 
 * @remarks
 * Architecture Decision Records:
 * 1. Uses Pinia for state management to leverage Vue's reactivity system
 * 2. Centralizes all station-related state to avoid prop drilling
 * 3. Provides explicit setters for better state tracking
 * 
 * Performance Considerations:
 * - Computed properties for derived state
 * - Reactive refs for optimal re-rendering
 * - Memoized search results
 */

export const useStationStore = defineStore('station', () => {  
  const stations = ref<Station[]>([]);
  const searchTerm = ref('');
  const filteredStations = ref<Station[]>([]);
  const availableCharacters = ref<string[]>([]);
  const loading = ref(false);
  const errorMessage = ref<string>('');
  const recentSearches = ref<Station[]>([]);
  const selectedStation = ref<Station | null>(null);  
  const userId = ref<string>('');
  const keyboardLayout = ref<KeyboardLayout>({
    letters: [],
    actions: []
  });
  
  const searchResult = computed(() => ({
    stations: filteredStations.value,
    nextCharacters: availableCharacters.value
  }));

  function setSearchResults(results: { filtered: Station[], characters: string[] }) {
    filteredStations.value = results.filtered;
    availableCharacters.value = results.characters;
  }

  function setSearchTerm(term: string) {
    searchTerm.value = term;
  }

  function setRecentSearches(searches: Station[]) {
    recentSearches.value = searches;
  }

  function loadRecentSearches(searches: Station[]) {    
    recentSearches.value = searches;
  }

  function setStations(newStations: Station[]) {
    stations.value = newStations;
  }

  function setLoading(isLoading: boolean) {
    loading.value = isLoading;
  }

  function setErrorMessage(message: string) {
    errorMessage.value = message;
  }

  function setSelectedStation(station: Station | null) {
    selectedStation.value = station;
  }

  function setUserId(id: string) {
    userId.value = id;
  }

  function setKeyboardLayout(layout: KeyboardLayout) {
    keyboardLayout.value = layout;
  }

  return {    
    stations,
    searchTerm,
    filteredStations,
    availableCharacters,
    loading,
    errorMessage,
    recentSearches,
    selectedStation,
    userId,
    keyboardLayout,
    searchResult,

    setSearchTerm,
    setSearchResults,
    setRecentSearches,
    loadRecentSearches,
    setStations,
    setLoading,
    setErrorMessage,
    setSelectedStation,
    setUserId,
    setKeyboardLayout
  };
});

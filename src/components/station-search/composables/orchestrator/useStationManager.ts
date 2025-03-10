import { useStationStore } from '@/stores/stationStore';
import { useStationSearch } from '@/components/station-search/composables/misc/useStationSearch';
import { useStationSearchAnalytics } from '@/composables/analytics/useStationSearchAnalytics';
import type { Station } from '@/types/station';
import { useRecentSearches } from '@/components/station-search/composables/misc/useRecentSearches';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

/**
 * Orchestrator composable for the station search feature
 * 
 * @remarks
 * Architecture Decision Records:
 * 1. Acts as a facade pattern, coordinating between:
 *    - Station search logic
 *    - Analytics tracking
 *    - Recent searches management
 *    - Navigation
 * 2. Centralizes complex interaction flows
 * 3. Keeps components purely presentational
 * 
 * @description
 * This composable:
 * - Manages user interactions (keyboard input, station selection)
 * - Coordinates between different services (search, analytics, storage)
 * - Handles navigation flows (checkout)
 * - Provides reactive state to components
 * 
 * @example
 * const {
 *   searchTerm,
 *   searchResult,
 *   appendLetter,
 *   handleStationSelect
 * } = useStationManager();
 * 
 * @returns {Object} State and handlers for station search interface
 * @property {Ref<string>} searchTerm - Current search input
 * @property {Ref<SearchResult>} searchResult - Filtered stations and available characters
 * @property {Function} appendLetter - Handles keyboard letter input
 * @property {Function} handleStationSelect - Manages station selection and tracking
 */
export function useStationManager() {
  const store = useStationStore();
  const router = useRouter();  
  const { handleSearch } = useStationSearch();
  const {     
    trackSearchCompletion,
    trackStationSelect,
    trackSpecialKeyUse,
    trackError 
  } = useStationSearchAnalytics();
  const { addToRecentSearches } = useRecentSearches();
  const {
    searchTerm,
    loading,
    errorMessage,
    searchResult,
    recentSearches,
    selectedStation,
    keyboardLayout
  } = storeToRefs(store);
    
  function handleCheckout(station: Station) {
    addToRecentSearches(station);
    return {
      stationCode: station.stationCode,
      stationName: station.stationName
    };
  }
    
  function appendLetter(letter: string) {    
    const newTerm = store.searchTerm + letter;    
    handleSearch(newTerm);
  }

  function handleSpecialKey(key: string) {
    trackSpecialKeyUse(key, { currentSearch: store.searchTerm });
    const newTerm = key === '⌫' 
      ? store.searchTerm.slice(0, -1)
      : store.searchTerm + (key === '␣' ? ' ' : key);
    handleSearch(newTerm);
  }

  function handleStationSelect(station: Station) {
    trackStationSelect(station, store.searchTerm);
    store.setSelectedStation(station);    
    store.setErrorMessage('');    
  }

  function handleCheckoutClick() {
    if (!store.selectedStation) {
      trackError(new Error('No station selected'));
      store.setErrorMessage('Please select a station first');;
      return;
    }

    trackSearchCompletion(store.searchTerm, store.filteredStations);
    handleCheckout(store.selectedStation);    
    router.push({ name: 'checkout' });
  }

  return {
    // UI State
    searchTerm,
    loading,
    errorMessage,
    keyboardLayout,
    
    // Search Results
    searchResult,
    recentSearches,
    selectedStation,
    
    // Actions
    appendLetter,
    handleSpecialKey,
    handleStationSelect,
    handleCheckoutClick,    
  };
} 
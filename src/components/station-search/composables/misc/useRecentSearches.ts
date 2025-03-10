import { useStationStore } from '@/stores/stationStore';
import { useLocalStorage } from '@/components/station-search/composables/misc/useLocalStorage';
import type { Station } from '@/types/station';

/**
 * Composable for managing recent station search history
 *
 * @remarks
 * Provides functionality to:
 * - Initialize recent searches from localStorage
 * - Add new searches to history
 * - Maintain a limited history size (max 5 entries)
 * - Prevent duplicate entries
 *
 * @returns Recent searches management methods
 * @property {Function} initializeRecentSearches - Loads saved searches from storage
 * @property {Function} addToRecentSearches - Adds new station to history
 *
 * @example
 * const { initializeRecentSearches, addToRecentSearches } = useRecentSearches();
 *
 * // Load saved searches
 * initializeRecentSearches();
 *
 * // Add new search
 * addToRecentSearches({ stationCode: 'LON', stationName: 'London' });
 */
export function useRecentSearches() {
  const store = useStationStore();
  const { loadRecentSearches, saveRecentSearches } = useLocalStorage();

  function addToRecentSearches(station: Station) {
    if (!station?.stationCode || !station?.stationName) {
      console.error('Invalid station data');
      return;
    }

    const currentRecents = store.recentSearches ?? [];

    const isAlreadyInRecents = currentRecents.some(
      (recent) => recent.stationCode === station.stationCode
    );

    if (!isAlreadyInRecents) {
      const updatedRecents = [station, ...currentRecents].slice(0, 5);
      store.setRecentSearches(updatedRecents);
      saveRecentSearches(updatedRecents);
    }
  }

  function initializeRecentSearches() {
    const savedSearches = loadRecentSearches();
    store.setRecentSearches(savedSearches);
  }

  return {
    addToRecentSearches,
    initializeRecentSearches,
  };
}

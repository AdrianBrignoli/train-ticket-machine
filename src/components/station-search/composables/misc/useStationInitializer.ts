import { useStationStore } from '@/stores/stationStore';
import { stationApi } from '@/services/api';
import { useStationSearch } from '@/components/station-search/composables/misc/useStationSearch';
import { useRecentSearches } from '@/components/station-search/composables/misc/useRecentSearches';
import { generateUserId } from '@/utils/generateUserId';
import { useABTesting } from '@/composables/AB-testing/useABTesting';
import { useKeyboardLayout } from '@/components/station-search/composables/misc/useKeyboardLayout';

/**
 * Composable for initializing the station search application
 *
 * @remarks
 * Handles the initialization sequence:
 * 1. Generates and sets unique user ID
 * 2. Fetches AB testing configuration
 * 3. Sets keyboard layout based on test variant
 * 4. Loads station data from API
 * 5. Initializes recent searches from storage
 *
 * @returns Initialization methods
 * @property {Function} initialize - Starts the initialization sequence
 *
 * @example
 * const { initialize } = useStationInitializer();
 *
 * // Initialize app
 * await initialize();
 */
export function useStationInitializer() {
  const store = useStationStore();
  const { handleSearch } = useStationSearch();
  const { initializeRecentSearches } = useRecentSearches();

  async function initializeStations() {
    store.setLoading(true);
    try {
      const response = await stationApi.getStations();
      if (response.data.length === 0) {
        throw new Error('No stations available');
      }
      store.setStations(response.data);
      handleSearch('');
    } catch (error) {
      console.error('Error initializing stations:', error);
      throw error;
    } finally {
      store.setLoading(false);
    }
  }

  async function initialize() {
    store.setUserId(generateUserId());
    const { variant } = await useABTesting('keypad_layout_experiment');
    store.setKeyboardLayout(useKeyboardLayout(variant.value).keyboardLayout);
    await initializeStations();
    initializeRecentSearches();
  }

  return {
    initialize,
  };
}

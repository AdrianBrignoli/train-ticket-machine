import { ref } from 'vue';
import type { Station } from '@/types/station';
import { useTracking } from './useTracking';
import { useStationStore } from '@/stores/stationStore';
import { storeToRefs } from 'pinia';

/**
 * Composable for tracking station search analytics events
 * 
 * @remarks
 * Provides tracking functions for:
 * - Station selection events
 * - Search completion events
 * - Special key usage
 * - Error events
 * 
 * Each tracking function includes:
 * - Relevant metadata
 * - Error handling
 * - Console logging for development
 * 
 * @returns Analytics tracking methods
 * @property {Function} trackStationSelect - Tracks when user selects a station
 * @property {Function} trackSearchCompletion - Tracks successful search completion
 * @property {Function} trackSpecialKeyUse - Tracks special keyboard key usage
 * @property {Function} trackError - Tracks error events
 * 
 * @example
 * const { trackStationSelect, trackError } = useStationSearchAnalytics();
 * 
 * // Track station selection
 * trackStationSelect(station, searchTerm);
 * 
 * // Track error
 * trackError(new Error('No station selected'));
 */
export function useStationSearchAnalytics() {
  const { trackEvent } = useTracking('StationSearch');
  const searchStartTime = ref(performance.now());
  const store = useStationStore();
  const { userId } = storeToRefs(store);

  const trackSpecialKeyUse = (key: string, context: { currentSearch: string }) => {
    trackEvent('KEYBOARD_INTERACTION', {
      type: 'special',
      key,
      currentSearch: context.currentSearch,
      timeFromStart: performance.now() - searchStartTime.value
    });
  };

  const trackStationSelect = (station: Station, currentSearch: string) => {
    trackEvent('STATION_SELECT', {
      station: station.stationName,
      code: station.stationCode,
      searchDuration: performance.now() - searchStartTime.value,
      searchTerm: currentSearch,
      userId: userId.value
    });
  };

  const trackSearchCompletion = (term: string, stations: Station[]) => {
    trackEvent('SEARCH_COMPLETED', {
      term,
      resultCount: stations.length,
      hasExactMatch: stations.some(s => 
        s.stationName.toUpperCase() === term.toUpperCase()
      ),
      userId: userId.value
    });
  };

  const trackError = (error: Error) => {
    trackEvent('SEARCH_ERROR', { 
      message: error.message,
      stack: error.stack 
    });
  };

  return {    
    trackStationSelect,
    trackSearchCompletion,
    trackError,    
    trackSpecialKeyUse    
  };
} 
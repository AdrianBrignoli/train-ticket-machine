import { computed } from 'vue';
import { useStationStore } from '../../../../stores/stationStore';

/**
 * Manages station search functionality with predictive keyboard input
 * 
 * @remarks
 * This composable handles the core search logic for the station search feature.
 * It filters stations based on user input and provides available next characters
 * for the predictive keyboard.
 * 
 * @returns {Object} Search methods and computed properties
 * @property {ComputedRef<Station[]>} filteredStations - Stations matching current search
 * @property {ComputedRef<string[]>} nextCharacters - Valid next characters for keyboard
 * @property {Function} handleSearch - Updates search term and triggers filtering
 */
export function useStationSearch() {
  const store = useStationStore();
  
  const getFilteredStations = computed(() => {
    const term = store.searchTerm?.toUpperCase() ?? '';
    const result = (store.stations ?? []).filter(station => 
      station?.stationName?.toUpperCase()
        ?.startsWith(term) ?? false
    );
    return result;
  });
    
  const getNextCharacters = computed(() => {
    const term = store.searchTerm;
    const filtered = getFilteredStations.value;
    const result = term === ''
      ? [...new Set((store.stations ?? [])
          .map(s => s?.stationName?.[0]?.toUpperCase())
          .filter(Boolean))]
      : [...new Set(filtered
          .map(station => {
            const nextCharIndex = term.length;
            return station?.stationName?.[nextCharIndex]?.toUpperCase() ?? '';
          })
          .filter(Boolean))];
    return result;
  });

  function handleSearch(term: string = '') {
    store.setSearchTerm(term);
    
    store.setSearchResults({ 
      filtered: getFilteredStations.value ?? [], 
      characters: getNextCharacters.value ?? [] 
    });
  }

  return {
    handleSearch,
  };
}

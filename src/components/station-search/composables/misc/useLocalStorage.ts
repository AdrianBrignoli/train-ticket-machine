import type { Station } from '@/types/station';

/**
 * Composable for managing recent station searches in localStorage
 * 
 * @remarks
 * Handles persistence of recently searched stations with:
 * - Type-safe loading/saving of Station[]
 * - Data validation
 * - Error handling for storage failures
 * 
 * @returns Storage management methods
 * @property {Function} loadRecentSearches - Retrieves recent searches, returns empty array on error
 * @property {Function} saveRecentSearches - Saves searches, returns success boolean
 * 
 * @example
 * const { loadRecentSearches, saveRecentSearches } = useLocalStorage();
 * 
 * // Load existing searches
 * const searches = loadRecentSearches();
 * 
 * // Save new search
 * const success = saveRecentSearches([...searches, newStation]);
 */
export function useLocalStorage() {
  function loadRecentSearches(): Station[] {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (!saved) return [];  

      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {  
        console.error('Invalid data format in localStorage');
        return [];
      }

      return parsed;
    } catch (e) {
      console.error('Failed to load recent searches:', e);
      return []; 
    }
  }

  function saveRecentSearches(searches: Station[]): boolean {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(searches));
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      return false;
    }
  }

  return {
    loadRecentSearches,
    saveRecentSearches
  };
} 
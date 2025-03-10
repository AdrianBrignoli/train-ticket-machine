import type { Station } from '@/types/station';

/**
 * Composable for managing recent station searches in localStorage
 *
 * @remarks
 * Handles persistence of recently searched stations with:
 * - Type-safe loading/saving of Station[]
 * - Data validation
 * - Error handling for storage failures
 * - Silent failure (logs errors but doesn't interrupt user flow)
 *
 * @returns Storage management methods
 * @property {Function} loadRecentSearches - Retrieves recent searches, returns empty array on error
 * @property {Function} saveRecentSearches - Silently persists searches to localStorage
 *
 * @example
 * const { loadRecentSearches, saveRecentSearches } = useLocalStorage();
 *
 * // Load existing searches
 * const searches = loadRecentSearches();
 *
 * // Save new search
 * saveRecentSearches([...searches, newStation]);
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

  function saveRecentSearches(searches: Station[]) {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(searches));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  return {
    loadRecentSearches,
    saveRecentSearches,
  };
}

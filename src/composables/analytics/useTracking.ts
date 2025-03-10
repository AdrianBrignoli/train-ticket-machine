import { analytics } from '@/services/analytics';
import { onMounted, onUnmounted } from 'vue';

/**
 * Core analytics tracking composable
 * 
 * @remarks
 * Provides a base tracking layer with:
 * - Event categorization by component
 * - Standardized event structure
 * - Development mode logging
 * - Error handling
 * 
 * @param component - Name of component generating events
 * @returns Tracking methods
 * @property {Function} trackEvent - Logs analytics event with metadata
 * 
 * @example
 * const { trackEvent } = useTracking('MyComponent');
 * 
 * // Track simple event
 * trackEvent('BUTTON_CLICK');
 * 
 * // Track event with metadata
 * trackEvent('FORM_SUBMIT', {
 *   formId: 'login',
 *   success: true
 * });
 */
export function useTracking(componentName: string) {
  onMounted(() => {
    analytics.trackEvent('COMPONENT_MOUNT', { component: componentName });
  });

  onUnmounted(() => {
    analytics.trackEvent('COMPONENT_UNMOUNT', { component: componentName });
  });

  return {
    trackEvent: analytics.trackEvent.bind(analytics)
  };
} 
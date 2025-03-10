type EventName =
  | 'LETTER_CLICK'
  | 'STATION_SELECT'
  | 'SEARCH_ERROR'
  | 'TOGGLE_DISPLAY'
  | 'COMPONENT_MOUNT'
  | 'COMPONENT_UNMOUNT'
  | 'SEARCH_COMPLETED'
  | 'KEYBOARD_INTERACTION'
  | 'EXPERIMENT_EXPOSURE'
  | 'auto_capture:keyboard_interaction';

interface TrackingEvent {
  name: EventName;
  properties?: Record<string, any>;
  timestamp: number;
}

interface PerformanceData {
  startTime: number;
  component: string;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private performanceData: Map<string, PerformanceData> = new Map();

  private constructor() {
    // Initialize analytics (could be Google Analytics, Mixpanel, etc.)
  }

  static getInstance(): AnalyticsService {
    if (!this.instance) {
      this.instance = new AnalyticsService();
    }
    return this.instance;
  }

  trackEvent(name: EventName, properties?: Record<string, any>) {
    const event: TrackingEvent = {
      name,
      properties,
      timestamp: Date.now(),
    };

    if (import.meta.env.DEV) {
      console.log('Analytics Event:', event);
    }

    // Send to analytics service
    // this.analyticsProvider.track(event);
  }

  startTracking(componentId: string) {
    this.performanceData.set(componentId, {
      startTime: performance.now(),
      component: componentId,
    });
  }

  endTracking(componentId: string) {
    const start = this.performanceData.get(componentId);
    if (start) {
      const duration = performance.now() - start.startTime;
      this.trackEvent('COMPONENT_MOUNT', {
        component: start.component,
        loadTime: duration,
      });
      this.performanceData.delete(componentId);
    }
  }
}

export const analytics = AnalyticsService.getInstance();

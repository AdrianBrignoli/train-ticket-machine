import { StatsigClient } from '@statsig/js-client';

export function createStatsigClient(userId: string) {
  const sdkKey = import.meta.env.VITE_STATSIG_SDK_KEY;
  
  if (!sdkKey) {
    console.warn('Statsig SDK key not found in environment variables');
    return {
      async getExperiment() {
        return { value: { variant: 'control' } };
      }
    };
  }

  const client = new StatsigClient(
    sdkKey,
    { userID: userId }
  );
  
  let initialized = false;
  const initPromise = client.initializeAsync().then(() => {    
    console.log('Statsig initialized with userID:', userId);
    initialized = true;
  });

  return {
    async getExperiment(experimentName: string) {
      if (!initialized) {
        await initPromise;
      }
      return client.getExperiment(experimentName);
    }
  };
} 
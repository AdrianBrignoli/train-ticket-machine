import { ref } from 'vue';
import { createStatsigClient } from '@/services/statsig';
import { useStationStore } from '@/stores/stationStore';

/**
 * composables for AB testing functionality
 * 
 * @param experimentName - Name of the experiment to fetch
 * @returns Experiment variant and conversion tracking
 */
export async function useABTesting(experimentName: string) {
  const store = useStationStore();
  const variant = ref<string>('control');
  const statsig = createStatsigClient(store.userId); 

  try {
    const experiment = await statsig.getExperiment(experimentName);
    
    if (experiment?.value?.variant) {
      variant.value = experiment.value.variant as string;
    } else {
      console.warn(`No variant found for experiment ${experimentName}, using control`);
    }
  } catch (error) {
    console.warn(`Failed to fetch experiment ${experimentName}, using control:`, error);
  }
  
  return {
    variant
  };
} 